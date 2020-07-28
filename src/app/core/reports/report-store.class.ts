import 	{ 	Injectable 			} 	from '@angular/core'
import	{	
			ItemStore,
			ItemStorage
		}							from '@rcc/core/items'

import	{	adHocId				}	from '@rcc/core/utils'

import	{	
			Report,
			ReportConfig				
		}							from './report.class'



function identifyItemBy(item: Report){

	if(item.id) return item.id

	return item.id = adHocId()
	
}

export class ReportStore extends ItemStore<ReportConfig, Report>{

	constructor(
		storage: ItemStorage<ReportConfig, Report>,
	){
		super({
			itemClass: 		Report,
			identifyItemBy,
			storage,
		})
	}

}