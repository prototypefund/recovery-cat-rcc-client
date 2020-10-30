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
			TranslationsModule,
			ItemAction,
			MetaAction
		}									from '@rcc/common'

import	{	
			Entry,
			EntryConfig, 
			EntryStore,
		}									from '@rcc/core'

import	{	QuestionaireModule			}	from '../questions'

import	{	EntryMetaStore				}	from './entry-meta-store.service'

import	{	
			ENTRY_STORES,
			ENTRY_ACTIONS,
			ENTRY_META_ACTIONS			
		}									from './entry-meta-store.commons'

import	{	EntryMetaStorePage 			}	from './overview-page/overview-page.component'
import	{	EntryLabelComponent			}	from './item-label/item-label.component'


import en from './i18n/en.json'
import de from './i18n/de.json'

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
	template:	`
					<ion-item routerLink = "entries">
						<ion-label>{{ "ENTRIES_META_STORE.MENU_ENTRY" | translate }}</ion-label>
						<ion-icon [name] ="'entry' | rccIcon" slot = "end"></ion-icon>
					</ion-item>
				`
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
		TranslationsModule.forChild("ENTRIES_META_STORE", {en, de}),
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
				stores?			: Type<EntryStore>[],
				itemActions?	: ItemAction<Entry>[],
				metaActions?	: MetaAction<Entry>[]
			): ModuleWithProviders<EntryMetaStoreModule> {

		const mwp = BaseMetaStoreModule.getModuleWithProviders(this, stores, itemActions, metaActions, ENTRY_STORES, ENTRY_ACTIONS, ENTRY_META_ACTIONS)
		return mwp
	}

}
