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

	public searchControl 	:FormControl	= new FormControl()
	//public filterFn			:(item: SymptomCheck)=>boolean

	constructor(
		public symptomCheckMetaStore: SymptomCheckMetaStore
	) { }

	ngOnInit() {

		// this.searchControl.valueChanges
		// .pipe(debounceTime(200))
		// .subscribe(search => {
		// 	this.filterFn = (item: SymptomCheck) => !!item.meaning.match(new RegExp(search,'gi')) //TODO translation and options
		// })
	}

}
