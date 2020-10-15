import 	{	
			Component, 
		} 								from '@angular/core'

import	{	FormControl 			}	from '@angular/forms'

import	{	Report					}	from '@rcc/core'

import	{
			debounceTime
		}								from 'rxjs/operators'

import	{
			ReportMetaStore
		}								from '../report-meta-store.service'


@Component({
	selector: 		'rcc-meta-store-page',
	templateUrl: 	'./overview-page.component.html',
	styleUrls: 		['./overview-page.component.scss'],
})
export class ReportMetaStorePage {

	public searchControl 	:FormControl	= new FormControl()
	//public filterFn			:(item: Report)=>boolean

	constructor(
		public symptomCheckMetaStore: ReportMetaStore
	) { }

	ngOnInit() {

		// this.searchControl.valueChanges
		// .pipe(debounceTime(200))
		// .subscribe(search => {
		// 	this.filterFn = (item: Report) => !!item.meaning.match(new RegExp(search,'gi')) //TODO translation and options
		// })
	}

}
