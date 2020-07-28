import	{ 
			Component, 
			Input,
			Optional,
			Inject,
			ContentChildren,
			TemplateRef,
			Type,
			Injector,
			ComponentFactoryResolver,

			ViewChild,
		}								from '@angular/core'

import	{
			Router
		}								from '@angular/router'


import 	{	
			ActionSheetController,
			IonItemSliding,
		}								from '@ionic/angular'

import	{
			map
		}								from 'rxjs/operators'

import	{
			IconsService
		}								from '@rcc/common/icons'

import	{	Item,
			ItemConfig,
			ItemStore,	
		}								from '@rcc/core'

import	{	MetaStore				}	from '../meta-store.class'

import	{	MetaStoreService		}	from '../meta-store.service'

import	{
			MetaStoreConfig,
			META_STORE_CONFIGS,
			ItemAction,
		}								from '../meta-store.commons'

import	{	RccTranslationService 	}	from '@rcc/common/translations'
import	{	RccToastController		}	from '@rcc/common/modals-provider'




@Component({
	selector: 		'rcc-store-item',
	templateUrl: 	'./store-item.component.html',
})							
export 	class StoreItemComponent
		<
			C extends ItemConfig, 
			I extends Item<C>, 
			S extends ItemStore<C,I>
		> {


	@ViewChild(IonItemSliding)
	slidingItem : IonItemSliding


	@Optional() @Input()
	set item(item: I){		
		this.setItem(item)
	}

	@Optional() @Input()
	set itemClass(itemClass: Type<I>){
		this.setItemClass(itemClass)
	}
	

	@Optional() @Input()
	set itemItemId(id:string){
		this.setItemId(id)
	}			

	@Optional() @Input('itemActions')
	set itemActions(itemActions: ItemAction<I>[]){
		this.localItemActions = itemActions
	}

	@Optional() @Input()
	selected	: boolean|null 	= null


	private _item				: I
	private	_itemClass			: Type<I>
	private _itemId				: string

	public store				: S
	public metaStore			: MetaStore<C,I,S>
	public metaStoreConfig		: MetaStoreConfig<C,I,S>
	public itemLabelComponent	: Type<any>
	public itemLabelContext		: any
	public itemIcon				: string
	public localItemActions		: ItemAction<I>[]
	public globalItemActions	: ItemAction<I>[]
	public itemLabelTemplate	: TemplateRef<any>


	constructor(		
		public	metaStoreService			: MetaStoreService,
		public 	actionSheetController		: ActionSheetController,
		private	rccTranslationService		: RccTranslationService,
		private router						: Router,
		private injector					: Injector,
		private	iconsService				: IconsService,
		private rccToastController			: RccToastController
	){}
	
	get item(): I {
		return this._item
	}

	public setItem(item:I): void {
		this._item				=	item

		if(!item){
			this.metaStore 			=
			this.store 				=
			this.metaStoreConfig	=
			this.itemIcon			=
			this.itemLabelTemplate	=
			this.globalItemActions	= 
			this.itemLabelContext	= null		
			return 
		}

		this.metaStore 			= 	this.metaStoreService.getMetaStore(item)
		this.store 				= 	this.metaStore.getStore(item) 
		this.metaStoreConfig	= 	this.metaStoreService.getMetaStoreConfig(item)
		this.itemLabelTemplate 	= 	this.metaStoreService.getItemLabelTemplate(item)		
		this.itemIcon			=	this.metaStoreConfig.itemIcon
		this.itemLabelContext	= 	{$implicit: item}				
		this.globalItemActions	= 	this.metaStore.itemActions
									.filter( (itemAction: ItemAction<I>) => {
										
										if(!itemAction.store) 						return true
										if(this.store instanceof itemAction.store)	return true
										
										return false
									})

	}

	public setItemClass(itemClass: Type<I>): any {
		this._itemClass = itemClass
		if(!this._itemId) return null

		this.metaStoreService.get(this._itemClass, this._itemId)
		.then( item => this.setItem(item) )

	}

	public setItemId(itemId: string): any {
		this._itemId	= itemId

		if(!this._itemClass) return null

		this.metaStoreService.get(this._itemClass, this._itemId)
		.then( item => this.setItem(item) )
	}




	get itemActions(){
		return 	this.localItemActions && this.localItemActions.length > 0
				?	this.localItemActions 
				:	this.globalItemActions	|| []
	}

	get mode(): string {
		if(this.selected !== null) 			return "select"
		if(this.itemActions.length <= 1)	return "simple"	
		if(this.itemActions.length <= 2)	return "basic"			

		return "complex"
	}


	public getHandler(itemAction: ItemAction<I>): () => any {
		let handler: () => any = () => null

		if(itemAction.handler) {
		
			const resolved_dependencies = (itemAction.dependencies ||[] ).map( (dep: any) => this.injector.get(dep) )

			return 	() =>	Promise.resolve(itemAction.handler(this._item, this.store, ...resolved_dependencies))
							.then( 
								(result:any) => {
									itemAction.successMessage
									?	this.rccToastController.success(itemAction.successMessage)
									:	result
								},

								(reason:any) => {
									itemAction.failureMessage
									?	this.rccToastController.failure(itemAction.failureMessage)
									:	Promise.reject(reason)
								}

							)
		}

		if(itemAction.path) 	return () => this.router.navigateByUrl(itemAction.path.replace(/:id/, this._item.id))
	}

	public toggleSlidingItem(){
		this.slidingItem
		.getSlidingRatio()
		.then( (ratio: number) => {
			ratio == 0
			?	this.slidingItem.open("end")
			:	this.slidingItem.close()
		})
	}

	public async showActions(){
		let buttons : any[] = []


		this.itemActions
		.forEach((itemAction: ItemAction<I>) => {
			buttons.push({
				text: 		this.rccTranslationService.translate(itemAction.label),
				icon: 		this.iconsService.get(itemAction.icon || 'view'),
				handler:	this.getHandler(itemAction) 	
			})
		})

		buttons.push({
				text: this.rccTranslationService.translate("META_STORE.ACTIONS.CANCEL"),
				icon: 'close',
				role: 'cancel'				
		})

		const actionSheet = await this.actionSheetController.create({
			//header: '{{}}'
			buttons
		})

		await actionSheet.present()
	}


	//TODO check if no actions or only one are available!

	public async actions(): Promise<any> {

		if(this.itemActions.length == 0)	return null

		if(this.mode == "select") 			return null

		if(this.mode == "simple")			return this.getHandler(this.itemActions[0])()

		if(this.mode == "basic")			return this.toggleSlidingItem()

		if(this.mode == "complex")			return this.showActions()
		
	}
}
