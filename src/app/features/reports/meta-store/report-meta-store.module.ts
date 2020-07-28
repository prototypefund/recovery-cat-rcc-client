import 	{ 	
			NgModule, 
			Component,
			InjectionToken,
			ModuleWithProviders,
			Type		
		} 									from '@angular/core'

import 	{ 	RouterModule 			}		from '@angular/router'

import	{	
			SharedModule,
			MainMenuModule, 		
			BaseMetaStoreModule,
			MetaStoreModule,
			ItemAction,
		}									from '@rcc/common'

import	{	
			Report,
			ReportConfig, 
			ReportStore,
		}									from '@rcc/core'


import	{	ReportMetaStore		}			from './report-meta-store.service'

import	{	
			REPORT_STORES,
			REPORT_ACTIONS			
		}									from './report-meta-store.commons'

import	{	ReportMetaStorePage 	}		from './overview-page/overview-page.component'
import	{	ReportLabelComponent	}		from './item-label/item-label.component'


const routes 			=	[
								{ path: 'reports',	component: ReportMetaStorePage	},
							]

const metaStoreConfig 	=	{
								itemClass:			Report,
								itemIcon:			'report',
								itemLabelComponent:	ReportLabelComponent,
								serviceClass:		ReportMetaStore
							} 


@Component({
	template:	'<ion-item routerLink = "reports"><ion-label>{{ "REPORTS.MENU_ENTRY" | transloco }}</ion-label></ion-item>'
})
export class MenuEntryReportMetaStore {}




@NgModule({
	declarations: [
		MenuEntryReportMetaStore,
		ReportMetaStorePage,
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild([MenuEntryReportMetaStore]),
		MetaStoreModule.forChild(metaStoreConfig)
	],

	exports: [
		MenuEntryReportMetaStore,
		ReportMetaStorePage,
		MetaStoreModule					//this is important so anything importing ReportMetaStoreModule can use the componets of MetaStoreModule too
	],
	providers:[
		ReportMetaStore,
	]
})
export class ReportMetaStoreModule extends BaseMetaStoreModule {

	static 	forChild(
				stores		: Type<ReportStore>[]		= [],
				actions		: ItemAction<Report>[]	= []
			): ModuleWithProviders<ReportMetaStoreModule> {

		const mwp = BaseMetaStoreModule.getModuleWithProviders(this, stores, actions, REPORT_STORES, REPORT_ACTIONS)
		return mwp
	}

}
