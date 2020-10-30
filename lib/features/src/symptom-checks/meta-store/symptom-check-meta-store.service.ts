import 	{	
			Injectable,
			Inject
		} 								from '@angular/core'


import	{	
			MetaStore,
			ItemAction,
			MetaAction			
		}								from '@rcc/common'

import	{	
			SymptomCheck,
			SymptomCheckConfig,
			SymptomCheckStore,
			DueData,
			Question,

		}								from '@rcc/core'

import	{	
			SYMPTOM_CHECK_STORES,
			SYMPTOM_CHECK_ACTIONS,
			SYMPTOM_CHECK_META_ACTIONS
		}								from './symptom-check-meta-store.commons'



@Injectable()
export class SymptomCheckMetaStore extends MetaStore<SymptomCheckConfig, SymptomCheck, SymptomCheckStore>{

	public readonly name = "SYMPTOM_CHECKS_META_STORE.NAME"

	public dueQuestions		: Question[]

	constructor(
		@Inject(SYMPTOM_CHECK_STORES) 
		stores		: SymptomCheckStore[],

		@Inject(SYMPTOM_CHECK_ACTIONS) 
		itemActions	: ItemAction<SymptomCheck>[],

		@Inject(SYMPTOM_CHECK_META_ACTIONS) 
		metaActions	: MetaAction<SymptomCheck>[]
	) {		
		super(stores, itemActions, metaActions)				
	}

	public getSymptomChecks(questionIds: string[]){
		return	this.stores
				.map( 		store 			=> 	store.items )
				.flat()
				.filter(	symptomCheck 	=> 	symptomCheck.coversQuestionIds(questionIds) )
	}


	public async getDue(date_1		:	Date, date_2		: Date, 		include_paused? : boolean										): Promise<DueData[]>
	public async getDue(date		: 	Date, plus_minus	: number,		include_paused? : boolean										): Promise<DueData[]>
	public async getDue(date		: 	Date, minus			: number,		plus			: number, 			include_paused?	: boolean	): Promise<DueData[]>
	public async getDue(date		:	Date, x				: any, 			y?				: any, 				z? 				: boolean	): Promise<DueData[]>
	{
		console.log("SymptomCheckMetaStore.getDue()")

		const due_data_array = await Promise.all(this.stores.map( store => store.getDue(date, x, y, z)))
		
		return due_data_array.flat()				
	}


}
