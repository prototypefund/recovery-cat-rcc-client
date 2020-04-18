import	{ 	
			NgModule,
			Component,
			ModuleWithProviders
		} 							from '@angular/core'
import 	{ 	CommonModule } 			from '@angular/common'
import 	{ 	IonicModule } 			from '@ionic/angular'
import 	{ 	FormsModule } 			from '@angular/forms'
import 	{ 	RouterModule } 			from '@angular/router'

import	{	MainMenuModule }		from '../main-menu/main-menu.module'

import	{	HomePage } 				from './home.page'


const routes 		=	[
							{ path: '',	component: HomePage	},
						]

@Component({
	template:	'<ion-item routerLink = ""><ion-label>Startseite</ion-label></ion-item>'
})
export class MenuEntryHome {}

const menuEntries	=	[MenuEntryHome]





@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild(menuEntries)
	],
	declarations: [
		HomePage,
		MenuEntryHome
	],
	exports:[
		MenuEntryHome	
	],
	entryComponents: [
		MenuEntryHome
	]
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
