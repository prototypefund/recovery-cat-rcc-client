import	{	
			Component,
			Optional,
			Input,
			OnInit			
		} 							from '@angular/core'


import	{	RccModalController	}	from '@rcc/common/modals-provider'

import	{	MetaStore			}	from '../meta-store.class'

import	{
			ItemConfig,
			Item,
			ItemStore
		}							from '@rcc/core'



@Component({
	selector: 		'rcc-meta-store.modal',
	templateUrl: 	'./meta-store.modal.html',
	styleUrls: 		['./meta-store.modal.scss'],
})
export class MetaStoreModal
				<
					C extends ItemConfig, 
					I extends Item<C>, 
					S extends ItemStore<C,I>
				> 
	implements OnInit {



	public metaStore	: MetaStore<C, I, S>
	public preSelected	: I[]

	@Optional() @Input()
	public selected		: I[]					= []
	

	constructor(
		public rccModalController : RccModalController
	){}

	ngOnInit(){
		Array.prototype.push.apply(this.selected, this.preSelected)
	}

	cancel(){
		this.rccModalController.dismiss(null)
	}

	accept(){		
		this.rccModalController.dismiss(this.selected)
	}

}
