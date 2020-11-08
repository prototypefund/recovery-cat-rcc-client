import	{	NgModule				}	from '@angular/core'
import	{	
			IncomingDataModule,
			TranslationsModule		
		}								from '@rcc/common'
import	{	RccToastController		}	from '@rcc/common'
import	{	ReportMetaStoreModule	}	from '../meta-store'
import	{	ReportImportStore		}	from './report-import-store.service'



import en from './i18n/en.json'
import de from './i18n/de.json'

const itemActions 		= 	[
								{
									label: 			'REPORT_IMPORT_STORE.ACTIONS.DELETE',
									store: 			ReportImportStore,
									handler: 		(item: any, store: any) => store.delete(item),
									icon:			'remove',
									successMessage:	'REPORT_IMPORT_STORE.ACTIONS.DELETE_SUCCESS'

								},
							]

@NgModule({
	declarations: [],
	imports: [
		ReportMetaStoreModule.forChild([ReportImportStore], itemActions),
		TranslationsModule.forChild("REPORT_IMPORT", {de,en}),
		IncomingDataModule
	],
	providers: [
		ReportImportStore
	]
})
export class ReportImportStoreModule { }
