import 	{ 	
			NgModule, 
			Component,
			InjectionToken,
			ModuleWithProviders,
			Type		
		} 									from '@angular/core'

import 	{ 	RouterModule 				}	from '@angular/router'

import	{	
			SharedModule,
			MainMenuModule, 		
			BaseMetaStoreModule,
			MetaStoreModule,
			ItemAction,
		}									from '@rcc/common'

import	{	
			Entry,
			EntryConfig, 
			EntryStore,
		}									from '@rcc/core'

import	{	QuestionaireModule			}	from '@rcc/features/questionaire'

import	{	EntryMetaStore				}	from './entry-meta-store.service'

import	{	
			ENTRY_STORES,
			ENTRY_ACTIONS			
		}									from './entry-meta-store.commons'

import	{	EntryMetaStorePage 			}	from './overview-page/overview-page.component'
import	{	EntryLabelComponent			}	from './item-label/item-label.component'




const routes 			=	[
								{ path: 'entries',	component: EntryMetaStorePage	},
							]

const metaStoreConfig 	=	{
								itemClass:			Entry,
								itemIcon:			'entry',
								itemLabelComponent:	EntryLabelComponent,
								serviceClass:		EntryMetaStore
							} 


@Component({
	template:	'<ion-item routerLink = "entries"><ion-label>{{ "ENTRYS.MENU_ENTRY" | transloco }}</ion-label></ion-item>'
})
export class MenuEntryEntryMetaStore {}



@NgModule({
	declarations: [
		MenuEntryEntryMetaStore,
		EntryMetaStorePage,
		EntryLabelComponent
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild([MenuEntryEntryMetaStore]),
		MetaStoreModule.forChild(metaStoreConfig),
		QuestionaireModule
	],

	exports: [
		MenuEntryEntryMetaStore,
		EntryMetaStorePage,
		MetaStoreModule					//this is important so anything importing EntryMetaStoreModule can use the componets of MetaStoreModule too
	],
	providers:[
		EntryMetaStore,
	]
})
export class EntryMetaStoreModule extends BaseMetaStoreModule {

	static 	forChild(
				stores		: Type<EntryStore>[]		= [],
				actions		: ItemAction<Entry>[]		= []
			): ModuleWithProviders<EntryMetaStoreModule> {

		const mwp = BaseMetaStoreModule.getModuleWithProviders(this, stores, actions, ENTRY_STORES, ENTRY_ACTIONS)
		return mwp
	}

}
