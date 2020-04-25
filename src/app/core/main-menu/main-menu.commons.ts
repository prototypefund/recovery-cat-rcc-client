
import	{	
			InjectionToken,
			Type,
		} 								from '@angular/core'


export type MainMenuEntryComponent = Type<any>

export interface MainMenuEntryConfig {
	position	: number,
	component	: MainMenuEntryComponent
}

export type MainMenuEntry = MainMenuEntryConfig | MainMenuEntryComponent

export class MainMenuEntries extends Array<MainMenuEntry> {}


export const MAIN_MENU_COMPONENT 	= new InjectionToken<Type<any>>('Component used as main menu')
export const MAIN_MENU_CONFIG 		= new InjectionToken<any>('Configuration object for main menu component')