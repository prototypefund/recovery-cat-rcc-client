
import	{	
			InjectionToken,
			Type,
		} 								from '@angular/core'




export interface MainMenuConfig {
	menuId 		: string,
	contentId	: string 
}


export class MainMenuConfigClass {
	menuId		: string
	contentId	: string
}

export const MAIN_MENU_CONFIG 		= new InjectionToken<MainMenuConfig>('MAIN_MENU_CONFIG');

export const MAIN_MENU_COMPONENTS 	= new InjectionToken<Type<any>[]>('MAIN_MENU_COMPONENTS');