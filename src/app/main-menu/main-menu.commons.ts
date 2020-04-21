
import	{	
			InjectionToken,
			Type,
		} 								from '@angular/core'


export class MainMenuComponents extends Array {
	[index:number]	: Type<any> 
}

export class MainMenuConfig {
	menuId		: string
	contentId	: string
	manual?		: boolean	
}

export const MAIN_MENU_COMPONENT = new InjectionToken<Type<any>>('Component used as main Menu');