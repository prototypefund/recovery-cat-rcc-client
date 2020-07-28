import 	{	
			Injectable,
			Inject
		} 								from '@angular/core'


import	{	
			MetaStore,
			ItemAction			
		}								from '@rcc/common'

import	{	
			SymptomCheck,
			SymptomCheckConfig,
			SymptomCheckStore
		}								from '@rcc/core'

import	{	
			SYMPTOM_CHECK_STORES,
			SYMPTOM_CHECK_ACTIONS
		}								from './symptom-check-meta-store.commons'

@Injectable()
export class SymptomCheckMetaStore extends MetaStore<SymptomCheckConfig, SymptomCheck, SymptomCheckStore>{

	constructor(
		@Inject(SYMPTOM_CHECK_STORES) 
		stores		: SymptomCheckStore[],

		@Inject(SYMPTOM_CHECK_ACTIONS) 
		itemActions	: ItemAction<SymptomCheck>[]
	) {
		super(stores, itemActions)				
	}
}
