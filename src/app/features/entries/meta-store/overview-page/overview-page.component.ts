import 	{	
			Component, 
		} 								from '@angular/core'

import	{	FormControl 			}	from '@angular/forms'

import	{	Entry					}	from '@rcc/core'

import	{
			debounceTime
		}								from 'rxjs/operators'

import	{
			EntryMetaStore
		}								from '../entry-meta-store.service'


@Component({
	selector: 		'rcc-meta-store-page',
	templateUrl: 	'./overview-page.component.html',
	styleUrls: 		['./overview-page.component.scss'],
})
export class EntryMetaStorePage {

	public searchControl 	:FormControl	= new FormControl()
	//public filterFn			:(item: Entry)=>boolean

	constructor(
		public symptomCheckMetaStore: EntryMetaStore
	) { }

	ngOnInit() {

		// this.searchControl.valueChanges
		// .pipe(debounceTime(200))
		// .subscribe(search => {
		// 	this.filterFn = (item: Entry) => !!item.meaning.match(new RegExp(search,'gi')) //TODO translation and options
		// })
	}

}
