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
			SymptomCheck,
			SymptomCheckConfig, 
			SymptomCheckStore,
		}									from '@rcc/core'


import	{	SymptomCheckMetaStore		}	from './symptom-check-meta-store.service'

import	{	
			SYMPTOM_CHECK_STORES,
			SYMPTOM_CHECK_ACTIONS			
		}									from './symptom-check-meta-store.commons'

import	{	SymptomCheckMetaStorePage 	}	from './overview-page/overview-page.component'
import	{	SymptomCheckLabelComponent	}	from './item-label/item-label.component'


const routes 			=	[
								{ path: 'symptom-checks',	component: SymptomCheckMetaStorePage	},
							]

const metaStoreConfig 	=	{
								itemClass:			SymptomCheck,
								itemIcon:			'symptom-check',
								itemLabelComponent:	SymptomCheckLabelComponent,
								serviceClass:		SymptomCheckMetaStore
							} 


@Component({
	template:	'<ion-item routerLink = "symptom-checks"><ion-label>{{ "SYMPTOM_CHECKS.MENU_ENTRY" | transloco }}</ion-label></ion-item>'
})
export class MenuEntrySymptomCheckMetaStore {}




@NgModule({
	declarations: [
		MenuEntrySymptomCheckMetaStore,
		SymptomCheckMetaStorePage,
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild([MenuEntrySymptomCheckMetaStore]),
		MetaStoreModule.forChild(metaStoreConfig)
	],

	exports: [
		MenuEntrySymptomCheckMetaStore,
		SymptomCheckMetaStorePage,
		MetaStoreModule					//this is important so anything importing SymptomCheckMetaStoreModule can use the componets of MetaStoreModule too
	],
	providers:[
		SymptomCheckMetaStore,
	]
})
export class SymptomCheckMetaStoreModule extends BaseMetaStoreModule {

	static 	forChild(
				stores		: Type<SymptomCheckStore>[]		= [],
				actions		: ItemAction<SymptomCheck>[]	= []
			): ModuleWithProviders<SymptomCheckMetaStoreModule> {

		const mwp = BaseMetaStoreModule.getModuleWithProviders(this, stores, actions, SYMPTOM_CHECK_STORES, SYMPTOM_CHECK_ACTIONS)
		return mwp
	}

}
