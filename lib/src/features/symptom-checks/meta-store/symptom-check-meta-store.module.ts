import 	{ 	
			NgModule, 
			Component,
			InjectionToken,
			ModuleWithProviders,
			Type,
			APP_INITIALIZER 
		} 									from '@angular/core'

import 	{ 	RouterModule 			}		from '@angular/router'

import	{	
			SharedModule,
			MainMenuModule, 		
			BaseMetaStoreModule,
			MetaStoreModule,
			ItemAction,
			MetaAction,
			TranslationsModule
		}									from '@rcc/common'

import	{	
			SymptomCheck,
			SymptomCheckConfig, 
			SymptomCheckStore,
		}									from '@rcc/core'


import	{	SymptomCheckMetaStore		}	from './symptom-check-meta-store.service'

import	{	
			SYMPTOM_CHECK_STORES,
			SYMPTOM_CHECK_ACTIONS,
			SYMPTOM_CHECK_META_ACTIONS,
			SymptomCheckHomePath			
		}									from './symptom-check-meta-store.commons'

import	{	SymptomCheckMetaStorePage 	}	from './overview-page/overview-page.component'
import	{	SymptomCheckLabelComponent	}	from './item-label/item-label.component'


import en from './i18n/en.json'
import de from './i18n/de.json'


const routes 			=	[
								{ path: SymptomCheckHomePath,	component: SymptomCheckMetaStorePage },
							]

const metaStoreConfig 	=	{
								itemClass:			SymptomCheck,
								itemIcon:			'symptom-check',
								itemLabelComponent:	SymptomCheckLabelComponent,
								serviceClass:		SymptomCheckMetaStore
							} 


@Component({
	template:	`
					<ion-item routerLink = "${SymptomCheckHomePath}">
						<ion-label>{{ "SYMPTOM_CHECKS_META_STORE.MENU_ENTRY" | translate }}</ion-label>
						<ion-icon [name] = "'symptom-check' | rccIcon " slot = "end"></ion-icon>
					</ion-item>
				`
})
export class MenuEntrySymptomCheckMetaStore {}




@NgModule({
	declarations: [
		MenuEntrySymptomCheckMetaStore,
		SymptomCheckMetaStorePage,
		SymptomCheckLabelComponent
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild([MenuEntrySymptomCheckMetaStore]),
		MetaStoreModule.forChild(metaStoreConfig),
		TranslationsModule.forChild("SYMPTOM_CHECKS_META_STORE", {en, de})
	],

	exports: [
		MetaStoreModule //So other Module need not import this specifically
	],

	providers:[	
		SymptomCheckMetaStore,
	]
})
export class SymptomCheckMetaStoreModule extends BaseMetaStoreModule {

	static 	forChild(
				stores?			: Type<SymptomCheckStore>[],
				itemActions?	: ItemAction<SymptomCheck>[],
				metaActions?	: MetaAction<SymptomCheck>[]
			): ModuleWithProviders<SymptomCheckMetaStoreModule> {

		const mwp = BaseMetaStoreModule.getModuleWithProviders(this, stores, itemActions, metaActions, SYMPTOM_CHECK_STORES, SYMPTOM_CHECK_ACTIONS, SYMPTOM_CHECK_META_ACTIONS)
		return mwp
	}

}
