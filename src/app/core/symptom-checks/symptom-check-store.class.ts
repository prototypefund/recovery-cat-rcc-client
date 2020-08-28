import 	{ 	Injectable 				} 	from '@angular/core'

import	{	
			ItemStore,
			ItemStorage,			
		}								from '@rcc/core/items'

import	{
			adHocId
		}								from '@rcc/core/utils'

import	{	
			DueData,
			SymptomCheck
		}								from './symptom-check.class'

import	{	
			SymptomCheckConfig	
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


	public async getDue(date_1	: Date, 	date_2		: Date, 			include_paused? : boolean											): Promise<DueData[]> 
	public async getDue(date		: Date, 	plus_minus	: number,			include_paused? : boolean										): Promise<DueData[]>
	public async getDue(date		: Date, 	minus		: number,			plus			: number, 			include_paused? : boolean	): Promise<DueData[]>
	public async getDue(date		: Date, 	x			: any, 				y?				: any, 				z? 				: boolean	): Promise<DueData[]>
	{
		
		await this.ready

		let include_paused: boolean 	

		if(typeof z == 'boolean') include_paused = z
		if(typeof y == 'boolean') include_paused = y


		return 	this.items
				.filter(	symptomCheck => include_paused || !symptomCheck.meta.paused)
				.map( 		symptomCheck => ({
												symptomChecks: 	[symptomCheck],
												questionIds: 	symptomCheck.getDueQuestionIds(date, x, typeof y == 'number' ? y : undefined) 
											})
				)

	}


}