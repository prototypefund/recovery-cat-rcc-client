import	{ 	
			NgModule,
			Component,
			ModuleWithProviders
		} 								from '@angular/core'
import 	{ 	CommonModule } 				from '@angular/common'
import 	{ 	IonicModule } 				from '@ionic/angular'
import 	{ 	RouterModule } 				from '@angular/router'

import	{	MainMenuModule }			from '../main-menu/main-menu.module'

import	{	HomePage } 					from './home.page'

import	{	TranslocoRootModule }		from '../translation/transloco-root.module'

const routes 		=	[
							{ path: '',	component: HomePage	},
						]

@Component({
	template:	'<ion-item routerLink = "" routerLinkActive = "" ><ion-label>{{ "HOMEPAGE.MENU_ENTRY" | transloco}}</ion-label></ion-item>'
})
export class MenuEntryHome {}

const menuEntries	=	[{position: 1, component: MenuEntryHome}]





@NgModule({
	imports: [
		IonicModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild(menuEntries),
		TranslocoRootModule
	],
	declarations: [
		HomePage,
		MenuEntryHome		
	],
	exports:[
		MenuEntryHome	
	],
})
export class HomePageModule {


	static forRoot(): ModuleWithProviders<HomePageModule> {
		return 	{
					ngModule: HomePageModule
				}
	}

	static forChild(): ModuleWithProviders<HomePageModule>{
		return	{
					ngModule: HomePageModule
				}
	}
}
