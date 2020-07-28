import 	{	
			Injectable,
			Inject
		} 								from '@angular/core'


import	{	
			MetaStore,
			ItemAction			
		}								from '@rcc/common'

import	{	
			Report,
			ReportConfig,
			ReportStore
		}								from '@rcc/core'

import	{	
			REPORT_STORES,
			REPORT_ACTIONS
		}								from './report-meta-store.commons'

@Injectable()
export class ReportMetaStore extends MetaStore<ReportConfig, Report, ReportStore>{

	constructor(
		@Inject(REPORT_STORES) 
		stores		: ReportStore[],

		@Inject(REPORT_ACTIONS) 
		itemActions	: ItemAction<Report>[]
	) {
		super(stores, itemActions)				
	}
}
