import	{ 
			Component, 
			Input,
			Optional,
			OnInit,
			OnDestroy,
			ViewChild
		} 									from '@angular/core'

import	{	FormControl					}	from '@angular/forms'
import	{	Router						}	from '@angular/router'
import	{	Location					}	from '@angular/common'
import	{	IonSearchbar				}	from '@ionic/angular'
import	{	PopoverController 			}	from '@ionic/angular'
import	{	SubscriptionLike			}	from 'rxjs'
import	{	RccToastController			}	from '@rcc/common/modals-provider'
import	{	MetaStore					}	from '../meta-store.class'
import	{	MetaAction					}	from '../meta-store.commons'





//TODO: abstract popover
@Component({
	templateUrl: './popover.html'	
})
export class PopoverComponent {

	public actions: MetaAction<any>[]

	constructor(
		public popoverController: PopoverController
	){}

}







@Component({
	selector: 		'rcc-meta-store-header',
	templateUrl: 	'./header.component.html',
	styleUrls: 		['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy{

	@Input()
	public metaStore		: MetaStore<any,any,any>

	@Optional() @Input()
	public filterControl	: FormControl


	public showSearch 		= false	
	public actions			: MetaAction<any>[]

	private subscriptions	: SubscriptionLike[] = []


	constructor(
		public popoverController	: PopoverController,
		public rccToastController	: RccToastController,
		public router				: Router,
		public location				: Location
	) {}


	ngOnInit(){
		this.actions =	this.metaStore.metaActions.map( metaAction => ({...metaAction, handler: this.getHandler(metaAction)}))

		if(this.filterControl) 	this.actions.unshift({
									label:  "META_STORE.ACTIONS.FILTER_ITEMS",
									icon: 	"filter",
									handler: () => this.toggleFilter()
								})

		this.subscriptions.push(
			this.location.subscribe( popstate =>{
				this.showSearch = !!popstate.state.showSearch 
				if(!this.showSearch && this.filterControl) this.filterControl.setValue('')
			})
		)
	}

	public toggleFilter(){

		this.showSearch = !this.showSearch
		
		const path	= this.location.path()


		this.showSearch
		?	this.location.go(path, '', {showSearch: true})
		:	this.location.back()

	}

	public getHandler(itemAction: MetaAction<any>): () => any {
		let handler: () => any = () => null

		if(itemAction.handler) {
		
			return 	() =>	Promise.resolve(itemAction.handler())
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

		if(itemAction.path) 	return () => this.router.navigateByUrl(itemAction.path)
	}

	public async showActions(event: Event){


		const popover = await 	this.popoverController.create({
									component: 		PopoverComponent,
									translucent: 	true,
									componentProps:	{
														actions: 	this.actions
													},
									event
								})


		return await popover.present()
	}

	ngOnDestroy(){
		this.subscriptions.forEach( sub => sub.unsubscribe() )
	}
}
