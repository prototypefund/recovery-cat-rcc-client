import	{	
			NgModule,
			ModuleWithProviders 
		} 						from '@angular/core'

import	{
			CommonModule 
		} 						from '@angular/common'


import	{
			ICON_MAP
		}						from './icons.commons'

import	{
			RccIconPipe
		}						from './icons.pipe'

import	{
			IconsService
		}						from './icons.service'

@NgModule({
	declarations: [
		RccIconPipe
	],
	imports: [
		CommonModule
	],
	providers: [
		IconsService,
		{provide: ICON_MAP, useValue: {} }
	],
	exports: [
		RccIconPipe
	]
})
export class IconsModule { 

	static forChild(iconMap: any): ModuleWithProviders{
		return	{
					ngModule: 	IconsModule,
					providers:	[{provide: ICON_MAP, useValue: iconMap}]
				}
	}
}
