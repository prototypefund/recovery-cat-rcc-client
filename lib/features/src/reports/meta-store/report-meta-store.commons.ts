import	{	InjectionToken 	}		from "@angular/core"
import 	{
			Report,
			ReportConfig,
			ItemStore,
		}							from '@rcc/core'

import	{	
			ItemAction,
			MetaAction		
		}							from '@rcc/common'



export const REPORT_STORES 			= new InjectionToken<ItemStore<ReportConfig, Report>>('Report Stores')
export const REPORT_ACTIONS 		= new InjectionToken<ItemAction<Report>>('Routes with Report id, represented as :id, plus label for actions menu and optional icon name, optional handler')
export const REPORT_META_ACTIONS 	= new InjectionToken<MetaAction<Report>>('Meta actions for reports')
