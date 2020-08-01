import	{
			Optional,
			Inject,
			Injector,
			Type,
			Injectable,
			TemplateRef,
			ComponentFactoryResolver
		}								from '@angular/core'


import	{
			ItemConfig,
			Item,
			ItemStore
		}								from '@rcc/core'

import	{	RccModalController		}	from '@rcc/common/modals-provider'

import	{
			MetaStoreConfig, 
			META_STORE_CONFIGS
		}								from './meta-store.commons'

import	{	MetaStore				}	from './meta-store.class'

import	{	MetaStoreModal			}	from './meta-store.modal/meta-store.modal'

@Injectable()
export class MetaStoreService {

	public 	metaStoreConfigs	: MetaStoreConfig<any, any, any> []

	private	templateCache		: Map<Type<any>, TemplateRef<any>> = new Map()

	constructor(
		@Optional() @Inject(META_STORE_CONFIGS)
		metaStoreConfigs				: MetaStoreConfig<any, any, any> [],
		public injector					: Injector,
		public componentFactoryResolver	: ComponentFactoryResolver,
		public rccModalController		: RccModalController
	){
		this.metaStoreConfigs 			= metaStoreConfigs || []
	}

	getMetaStoreConfig<I extends Item<any>>(item: 		I)			: MetaStoreConfig<any,I,any>
	getMetaStoreConfig<I extends Item<any>>(itemClass:	Type<I>)	: MetaStoreConfig<any,I,any> 
	getMetaStoreConfig<I extends Item<any>>(value:		I|Type<I>)	: MetaStoreConfig<any,I,any> 
	getMetaStoreConfig<I extends Item<any>>(value:		I|Type<I>)	: MetaStoreConfig<any,I,any> {

		if(value instanceof Item) return this.getMetaStoreConfig(value.constructor as Type<I>)

		const config = this.metaStoreConfigs.find( (config: MetaStoreConfig<any,I,any>) => config.itemClass == value)
		
		if(!config) throw "MetaStoreConfig missing for "+value.name	
		return config



	}

	getMetaStore<I extends Item<any>>(item: 		I)				: MetaStore<any,I,any>
	getMetaStore<I extends Item<any>>(itemClass:	Type<I>)		: MetaStore<any,I,any> 
	getMetaStore<I extends Item<any>>(value: 		I | Type<I>)	: MetaStore<any,I,any> 
	getMetaStore<I extends Item<any>>(value: 		I | Type<I>)	: MetaStore<any,I,any> {

		const config = this.getMetaStoreConfig(value)
		return this.injector.get(config.serviceClass)
		
	}

	getStore<I extends Item<any>>(item: I): ItemStore<any, I> {
		return this.getMetaStore(item).getStore(item)
	}
	


	getItemLabelComponent<I extends Item<any>>(item: 		I)			: Type<any>
	getItemLabelComponent<I extends Item<any>>(itemClass: 	Type<I>)	: Type<any>
	getItemLabelComponent<I extends Item<any>>(value: 		I |Type<I>)	: Type<any> 	
	getItemLabelComponent<I extends Item<any>>(value: 		I |Type<I>)	: Type<any> {	

		const config = this.getMetaStoreConfig(value)
		return config.itemLabelComponent

	}


	getItemLabelTemplate<I extends Item<any>>(item: 		I)			: TemplateRef<any>
	getItemLabelTemplate<I extends Item<any>>(itemClass: 	Type<I>)	: TemplateRef<any>
	getItemLabelTemplate<I extends Item<any>>(value: 		I |Type<I>)	: TemplateRef<any>
	getItemLabelTemplate<I extends Item<any>>(value: 		I |Type<I>)	: TemplateRef<any> {	

		//make sure value is the item class
		if(value instanceof Item) return this.getItemLabelTemplate(value.constructor as Type<I>)

		if(this.templateCache.has(value)) return this.templateCache.get(value)

		const itemLabelComponent 	= 	this.getItemLabelComponent(value)
		const instance				= 	this.componentFactoryResolver
										.resolveComponentFactory(itemLabelComponent)
										.create(this.injector)
										.instance

		this.templateCache.set(value, instance.itemLabelTemplate)	

		return this.templateCache.get(value)

	}


	async selectItems<I extends Item<any>>(itemClass: Type<I>, preSelected: I[] = [])	: Promise<I[]> {	

		const metaStore = this.getMetaStore(itemClass)	

		return await 	this.rccModalController.present(MetaStoreModal, { preSelected, metaStore })
						.then( (result: I[] | null ) => result || Promise.reject('user_canceled') )
	}



	async get<I extends Item<any>>(itemClass: Type<I>, id		: string			): Promise<I>
	async get<I extends Item<any>>(itemClass: Type<I>, ids		: string[]			): Promise<I[]>
	async get<I extends Item<any>>(itemClass: Type<I>, id_or_ids: any				): Promise<I|I[]> {			

		return await this.getMetaStore(itemClass).get(id_or_ids)

	}

}