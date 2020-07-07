import 	{ 	Injectable 			} 		from '@angular/core'

import	{	
			ItemStore,
			ItemStorage,			
		}								from '@rcc/core/items'

import	{
			adHocId
		}								from '@rcc/core/utils'

import	{	
			SymptomCheck
		}								from './symptom-check.class'

import	{	
			SymptomCheckConfig,		
		}								from './symptom-checks.commons'



function identifyItemBy(item:SymptomCheck){

	if(item.id) return item.id

	return item.id = adHocId()
	
}

export class SymptomCheckStore extends ItemStore<SymptomCheckConfig, SymptomCheck>{

	constructor(
		storage: ItemStorage<SymptomCheckConfig, SymptomCheck>,
	){
		super({
			itemClass: 		SymptomCheck,
			identifyItemBy,
			storage,
		})
	}

}