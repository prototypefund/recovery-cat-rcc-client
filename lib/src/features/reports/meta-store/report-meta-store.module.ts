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
			TranslationsModule,
			ItemAction,
			MetaAction
		}									from '@rcc/common'

import	{	
			Report,
			ReportConfig, 
			ReportStore,
		}									from '@rcc/core'


import	{	ReportMetaStore		}			from './report-meta-store.service'

import	{	
			REPORT_STORES,
			REPORT_ACTIONS,
			REPORT_META_ACTIONS			
		}									from './report-meta-store.commons'

import	{	ReportMetaStorePage 	}		from './overview-page/overview-page.component'
import	{	ReportLabelComponent	}		from './item-label/item-label.component'



import en from './i18n/en.json'
import de from './i18n/de.json'



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
	template:	'<ion-item routerLink = "reports"><ion-label>{{ "REPORT_META_STORE.MENU_ENTRY" | translate }}</ion-label></ion-item>'
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
		MetaStoreModule.forChild(metaStoreConfig),
		TranslationsModule.forChild("REPORT_META_STORE", {en,de})
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
				stores?			: Type<ReportStore>[],
				itemActions?	: ItemAction<Report>[],
				metaActions?	: MetaAction<Report>[]
			): ModuleWithProviders<ReportMetaStoreModule> {

		const mwp = BaseMetaStoreModule.getModuleWithProviders(this, stores, itemActions, metaActions, REPORT_STORES, REPORT_ACTIONS, REPORT_META_ACTIONS)
		return mwp
	}

}
