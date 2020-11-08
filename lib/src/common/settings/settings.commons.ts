import	{
			Type,
			InjectionToken
		}								from '@angular/core'

import	{	BehaviorSubject			}	from 'rxjs'

export interface SettingConfig {
	label:			string
	type?:			'boolean' | 'string' | 'number'
	component?:		Type<any>
	options?:		{value: string, label:string}[]
	deps?:			Type<any>[]
	changeFactory?:	(...args: any[]) => BehaviorSubject<any>
	change$?:		BehaviorSubject<any>
}


export const SETTING_CONFIGS = new InjectionToken<SettingConfig>("Settings")