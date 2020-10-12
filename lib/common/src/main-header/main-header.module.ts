import	{	
			NgModule,
			ModuleWithProviders
		}									from '@angular/core'

import	{	CommonModule				}	from '@angular/common'

import 	{ 	IonicModule 				}	from '@ionic/angular'

import	{	
			ComponentWithPosition,
			MAIN_HEADER_CONFIG		
		}									from './main-header.commons'

import	{	CommonHeaderComponent		}	from './common-header/common-header.component'
import	{	MainHeaderService			}	from './main-header.service'


@NgModule({
	imports: [
		CommonModule,
		IonicModule
	],
	providers: [
		MainHeaderService
	],
	declarations: [
		CommonHeaderComponent
	],
	exports:[
		CommonHeaderComponent
	]
})
export class MainHeaderModule { 

	static forChild( cwps: ComponentWithPosition[] ): ModuleWithProviders<MainHeaderModule>{
		return 	{
					ngModule: 	MainHeaderModule,
					providers: 	[
									... cwps.map( cwp => ({
										provide: 	MAIN_HEADER_CONFIG,
										useValue:	cwp,
										multi:		true
									}))
								]
				}
	}
}
