import 	{ 	Injectable 			} 	from '@angular/core'
import	{	
			ItemStore,
			ItemStorage
		}							from '@rcc/core/items'

import	{	ReportConfig		}	from './reports.commons'
import	{	Report				}	from './report.class'


export function identifyItemBy(item:Report){
	let id: 	string
	let max:	number = -1

	for (let [key, value] of this.map.entries()) {
		if(value === item){ id = key }
		max = Math.max( max, parseInt(key) )	
	}

	return id || String(max+1)

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