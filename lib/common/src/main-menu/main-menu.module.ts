import	{	
			NgModule,
			Component, 
			ModuleWithProviders,
		} 									from '@angular/core'

import	{	CommonModule				}	from '@angular/common'
import	{	TranslationsModule			}	from '@rcc/common/translations'
import	{	IconsModule					}	from '@rcc/common/icons'
import 	{ 	IonicModule 				}	from '@ionic/angular'
import	{	MainHeaderModule			}	from '@rcc/common/main-header'
import	{	NotificationModule			}	from '@rcc/common/notifications'
import	{	MainMenuComponent 			}	from './main-menu.component'
import	{	MainMenuHeaderItemComponent	}	from './header-item/header-item.component'

import	{	
			MainMenuEntries,
			MainMenuEntry, 
			MAIN_MENU_COMPONENT,
			MAIN_MENU_CONFIG
		}									from './main-menu.commons'



import en from './i18n/en.json'
import de from './i18n/de.json'

const mainHeaderConfig = 	[
								{component: MainMenuHeaderItemComponent, position: 1}
							]




export function provideEntries(entries: MainMenuEntry[]){

	return	entries.map( entry => ({ 
				provide: 	MainMenuEntries,  
				multi:		true,
				useValue:	entry
			}))
			

}


@NgModule({
	declarations: [
		MainMenuComponent,
		MainMenuHeaderItemComponent
	],

	imports: [
		CommonModule,
		IonicModule,
		TranslationsModule.forChild("MAIN_MENU", {en, de}),
		IconsModule,
		NotificationModule,
		MainHeaderModule.forChild(mainHeaderConfig)
	],
	
	exports: [
		MainMenuComponent,
		MainMenuHeaderItemComponent
	],

	providers: [
		{ provide: MAIN_MENU_CONFIG, 	useValue: {} },
		{ provide: MAIN_MENU_COMPONENT,	useValue: MainMenuComponent}
	]

})
export class MainMenuModule {


	static forRoot(config: any, entries: MainMenuEntry[] = []): ModuleWithProviders<MainMenuModule> {

		return	{
			ngModule: 	MainMenuModule,
			providers:	[
							provideEntries(entries),
							{ provide: MAIN_MENU_CONFIG, 	useValue:	config },

						]
		}

	}

	static forChild(entries: MainMenuEntry[] = []): ModuleWithProviders<MainMenuModule> {

		return	{
			ngModule: 	MainMenuModule,
			providers:	[
							provideEntries(entries),
						]
		}
	}

}
