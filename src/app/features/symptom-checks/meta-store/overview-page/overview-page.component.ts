import 	{	
			Component, 
		} 								from '@angular/core'

import	{	FormControl 			}	from '@angular/forms'

import	{	SymptomCheck			}	from '@rcc/core'

import	{
			debounceTime
		}								from 'rxjs/operators'

import	{
			SymptomCheckMetaStore
		}								from '../symptom-check-meta-store.service'


@Component({
	selector: 		'rcc-meta-store-page',
	templateUrl: 	'./overview-page.component.html',
	styleUrls: 		['./overview-page.component.scss'],
})
export class SymptomCheckMetaStorePage {

	public filterControl 	: FormControl	= new FormControl()

	constructor(
		public symptomCheckMetaStore: SymptomCheckMetaStore
	) { }

}
