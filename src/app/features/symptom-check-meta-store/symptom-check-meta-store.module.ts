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

import	{	SymptomCheckMetaStorePage 	}	from './symptom-check-meta-store.page/symptom-check-meta-store.page'
import	{	SymptomCheckLabelComponent	}	from './symptom-check-label/symptom-check-label.component'


const routes 			=	[
								{ path: 'symptomchecks',	component: SymptomCheckMetaStorePage	},
							]

const metaStoreConfig 	=	{
								itemClass:			SymptomCheck,
								itemIcon:			'symptom-check',
								itemLabelComponent:	SymptomCheckLabelComponent,
								serviceClass:		SymptomCheckMetaStore
							} 

@Component({
	template:	'<ion-item routerLink = "symptomchecks"><ion-label>{{ "SYMPTOM_CHECKS.MENU_ENTRY" | transloco }}</ion-label></ion-item>'
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
		MetaStoreModule
	],
	providers:[
		SymptomCheckMetaStore
	]
})
export class SymptomCheckMetaStoreModule {

	static 	forChild(
				stores		: Type<SymptomCheckStore>[]		= [],
				actions		: ItemAction<SymptomCheck>[]	= []
			): ModuleWithProviders {

		return 	{
					ngModule:	SymptomCheckMetaStoreModule,
					providers:	[
									...(stores||[])	.map( 	storeClass	=> ({provide: SYMPTOM_CHECK_STORES,		useExisting: 	storeClass, 	multi:true })),
									...(actions||[]).map( 	action 		=> ({provide: SYMPTOM_CHECK_ACTIONS,	useValue: 		action, 		multi:true })),

								]
				}
	}
}
