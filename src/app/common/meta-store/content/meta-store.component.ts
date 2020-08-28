import  { 
			Component, 
			Input,
			OnInit,
			OnDestroy,
			Optional,
			ContentChild,
			TemplateRef,
			Inject,
			Injector,
			Type
		}             				from '@angular/core'

import	{	FormControl			}	from '@angular/forms'
import	{	Subscription		}	from 'rxjs'
import	{	Item				}	from '@rcc/core'

import	{	MetaStoreConfig		}	from '../meta-store.commons'

import	{	MetaStore			}	from '../meta-store.class'

@Component({
	selector: 'rcc-meta-store',
	templateUrl: './meta-store.component.html',
	styleUrls: ['./meta-store.component.scss'],
})

export class MetaStoreComponent implements OnInit, OnDestroy {

	@ContentChild(TemplateRef) public itemLabelTemplate: TemplateRef<any>;

	@Input()
	public itemClass		: Type<any>

	@Input()
	public metaStore		: MetaStore<any, any, any>

	@Optional() @Input()
	public filterControl	: FormControl

	@Optional() @Input('selectInto')
	public selected			: Item<any>[] | null	= null	

	@Optional() @Input()
	public set filterQuery(query: string){
		this.query = query
	}


	private query			: string
	private subscriptions	: Subscription[] =[]

	public filterItems(items: Item<any>[]){
		if(!this.query) return items
		return items.filter( (item:Item<any> ) => item.match(this.query) )
	}


	public toggleSelect(item: Item<any>): any {
		if(! Array.isArray(this.selected) ) return null

		const pos = this.selected.indexOf(item)

		pos == -1
		?	this.selected.push(item)
		:	this.selected.splice(pos,1)
		
	}

	ngOnInit(){
		if(this.filterControl){
			this.subscriptions.push(
				this.filterControl.valueChanges.subscribe( value => this.query = value)
			)
		}

	}

	ngOnDestroy(){
		this.subscriptions.forEach( sub => sub.unsubscribe() )
	}

}
