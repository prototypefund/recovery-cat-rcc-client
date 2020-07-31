import	{	NgModule				}	from '@angular/core'
import	{	IncomingDataModule		}	from '@rcc/common'
import	{	ReportMetaStoreModule	}	from '@rcc/features/reports/meta-store'
import	{	ReportImportStore		}	from './report-import-store.service'
import	{	RccToastController		}	from '@rcc/common'



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
		IncomingDataModule.forChild({
			dependencies:	[ReportImportStore],
			checkClaim: 	(data:any, reportImportStore:ReportImportStore) => reportImportStore.checkClaim(data),			
		})
	],
	providers: [
		ReportImportStore
	]
})
export class ReportImportStoreModule { }
