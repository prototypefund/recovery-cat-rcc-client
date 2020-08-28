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

	public filterControl 	: FormControl	= new FormControl()

	constructor(
		public symptomCheckMetaStore: EntryMetaStore
	) { }


}
