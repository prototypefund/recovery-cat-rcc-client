import	{	
			NgModule,
			Component, 
			ModuleWithProviders,
			InjectionToken,
			Type,
			ApplicationRef 
		} 								from '@angular/core'

import	{	CommonModule } 				from '@angular/common'

import 	{	
			IonicModule, 
		}								from '@ionic/angular'

import	{	MainMenuComponent }			from './main-menu.component'

import	{	
			MAIN_MENU_COMPONENTS,
			MAIN_MENU_CONFIG,
			MainMenuConfig,
			MainMenuConfigClass
		}								from './main-menu.commons'





export function provideComponents(components: Type<any>[]){

	return	components.map( component => ({ 
				provide: 	MAIN_MENU_COMPONENTS,  
				multi:		true,
				useValue:	component
			}))
			

}



@NgModule({
	declarations: 		[
							MainMenuComponent
						],

	imports: 			[
							IonicModule,
							CommonModule,
						],
	
	exports:			[
							MainMenuComponent
						]

})
export class MainMenuModule {


	static forRoot(components: Type<any>[] = [], config: MainMenuConfig): ModuleWithProviders<MainMenuModule> {

		return	{
			ngModule: 	MainMenuModule,
			providers:	[
							provideComponents(components),
							{ provide: MainMenuConfigClass, useValue : config }
						]
		}

	}

	static forChild(components: Type<any>[] = [] ): ModuleWithProviders<MainMenuModule> {

		console.log(components)

		return	{
			ngModule: 	MainMenuModule,
			providers:	[
							provideComponents(components)
						]
		}
	}


}
