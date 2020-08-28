import	{ 
			InjectionToken,
			Type
		}								from '@angular/core'


export interface ComponentWithPosition {
	component	: Type<any>
	position	: number
}



export type MainHeaderComponent = Type<any>

export interface MainHeaderItemConfig {
	position	: number,
	component	: MainHeaderComponent
}

export type MainHeaderItem = MainHeaderItemConfig | MainHeaderComponent

export const MAIN_HEADER_CONFIG = new InjectionToken<MainHeaderComponent>("Main Header Config")

