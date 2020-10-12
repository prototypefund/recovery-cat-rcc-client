import 	{	NgModule 						} 	from '@angular/core'
import	{	
			DevModule,	
			TranslationsModule			
		}										from '@rcc/common'

import	{	
			SymptomCheckMetaStoreModule,
		}										from '@rcc/features/symptom-checks/meta-store'

import	{	StaticSymptomCheckStore			}	from './static-symptom-check-store.service'


import en from './i18n/en.json'
import de from './i18n/de.json'

@NgModule({
	imports: [
		SymptomCheckMetaStoreModule.forChild([StaticSymptomCheckStore]),
		DevModule.note('StaticSymptomCheckStoreModule'),
		TranslationsModule.forChild("STATIC_SYMPTOM_CHECK_STORE", {en, de})
	],
	providers: [
		StaticSymptomCheckStore
	]
})
export class StaticSymptomCheckStoreModule{}
