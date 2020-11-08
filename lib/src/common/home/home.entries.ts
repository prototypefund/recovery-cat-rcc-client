
import	{	
			InjectionToken,
			Type,
			Component,
			Provider
		} 								from '@angular/core'

import	{
			Factory,
			isFactory
		}								from '@rcc/common/interfaces'

export class HomePageEntryConfig {
	position?		: number
	label?			: string
	icon?			: string
	action?			: (...args:any[]) => any
	route?			: string | string[]
	description?	: string
	component?		: Type<any>
	childComponent?	: Type<any>
}

export class HomePageEntries extends Array<HomePageEntryConfig> {}


export function provideHomePageEntries( configs : (HomePageEntryConfig | Factory<HomePageEntryConfig>)[] ): Provider[] {
	return 	[
				configs.map( config => 
						isFactory(config)
						?	{
								provide:	HomePageEntries,
								deps:		config.deps,
								useFactory: config.factory,
								multi:		true
							}
						:	{
								provide: 	HomePageEntries,
								useValue:	config,
								multi:		true
							}
				)
			]
}