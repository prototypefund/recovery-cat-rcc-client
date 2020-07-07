import  { 
			Component, 
			Input,
			Optional,
			ContentChild,
			TemplateRef,
			Inject,
			Injector,
			Type
		}             				from '@angular/core'

import	{	Item				}	from '@rcc/core'

import	{	
			MetaStoreConfig	
		}							from '../meta-store.commons'

import	{	MetaStore			}	from '../meta-store.class'

@Component({
	selector: 'rcc-meta-store',
	templateUrl: './meta-store.component.html',
	styleUrls: ['./meta-store.component.scss'],
})

export class MetaStoreComponent {

	@ContentChild(TemplateRef) public itemLabelTemplate: TemplateRef<any>;

	@Input()
	public itemClass		: Type<any>

	@Input()
	public metaStore		: MetaStore<any, any, any>

	@Optional() @Input()
	public filter			: (item: Item<any>) => boolean

	@Optional() @Input('selectInto')
	public selected			: Item<any>[] | null	= null	

	public filterItems(items: Item<any>[]){
		if(!this.filter) return items
		return items.filter( (item:Item<any> ) => this.filter(item) )
	}


	public toggleSelect(item: Item<any>): any {
		if(! Array.isArray(this.selected) ) return null

		const pos = this.selected.indexOf(item)

		pos == -1
		?	this.selected.push(item)
		:	this.selected.splice(pos,1)
		
	}

}
