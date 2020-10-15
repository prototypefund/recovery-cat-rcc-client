import	{ 
			NgModule 
		} 									from '@angular/core'

import	{	
			IncomingDataModule,
			TranslationsModule			
		}									from '@rcc/common'
import	{	ImportSymptomCheckStore		}	from './import-symptom-check-store.service'
import	{	SymptomCheckMetaStoreModule	}	from '../meta-store'

import en from './i18n/en.json'
import de from './i18n/de.json'


const itemActions 		= 	[
								{
									label: 			'IMPORT_SYMPTOM_CHECK_STORE.ACTIONS.DELETE',
									store: 			ImportSymptomCheckStore,
									handler: 		(item: any, store: any) => store.deleteSymptomCheck(item),
									icon:			'delete',
									successMessage:	'IMPORT_SYMPTOM_CHECK_STORE.ACTIONS.DELETE_SUCCESS',
									role:			'destructive' as const

								},
							]

@NgModule({
	providers: [
		ImportSymptomCheckStore
	],
	declarations: [

	],
	imports: [
		SymptomCheckMetaStoreModule.forChild([ImportSymptomCheckStore], itemActions),
		TranslationsModule.forChild("IMPORT_SYMPTOM_CHECK_STORE", {en,de} ),
		IncomingDataModule
	]
})
export class ImportSymptomCheckStoreModule { }
