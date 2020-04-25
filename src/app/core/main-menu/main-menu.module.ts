import	{	
			NgModule,
			Component, 
			ModuleWithProviders,
		} 								from '@angular/core'

import	{	SharedModule 			}	from '../shared.module'

import	{	MainMenuComponent 		}	from './main-menu.component'

import	{	
			MainMenuEntries,
			MainMenuEntry, 
			MAIN_MENU_COMPONENT,
			MAIN_MENU_CONFIG
		}								from './main-menu.commons'





export function provideEntries(entries: MainMenuEntry[]){

	return	entries.map( entry => ({ 
				provide: 	MainMenuEntries,  
				multi:		true,
				useValue:	entry
			}))
			

}


@NgModule({
	declarations: 		[
							MainMenuComponent,
						],

	imports: 			[
							SharedModule
						],
	
	exports:			[
							MainMenuComponent,
						],
	providers:			[
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

	static forChild(entries: MainMenuEntry[] = [] ): ModuleWithProviders<MainMenuModule> {

		return	{
			ngModule: 	MainMenuModule,
			providers:	[
							provideEntries(entries),
						]
		}
	}

}
