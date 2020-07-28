import 	{	NgModule 						} 	from '@angular/core'
import	{	
			DevModule,				
		}										from '@rcc/common'

import	{	
			SymptomCheckMetaStoreModule,
			SYMPTOM_CHECK_STORES		
		}										from '@rcc/features/symptom-checks/meta-store'

import	{	StaticSymptomCheckStore			}	from './static-symptom-check-store.service'


@NgModule({
	imports: [
		SymptomCheckMetaStoreModule.forChild([StaticSymptomCheckStore]),
		DevModule.note('StaticSymptomCheckStoreModule')
	],
	providers: [
		StaticSymptomCheckStore
	]
})
export class StaticSymptomCheckStoreModule{}
