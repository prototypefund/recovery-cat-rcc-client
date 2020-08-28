import	{ 	
			NgModule,
			Component,
			ModuleWithProviders
		} 								from '@angular/core'
import 	{ 	RouterModule 			}	from '@angular/router'
import	{	MainMenuModule 			}	from '../main-menu/main-menu.module'
import	{	TranslationsModule		}	from '../translations'
import	{	SharedModule 			}	from '../shared.module'
import	{	NotificationModule		}	from '../notifications'
import	{	QrCodeModule			}	from '../qr-code'
import	{	HomePage 				}	from './home.page'

import	de from './i18n/de.json'
import	en from './i18n/en.json'



const routes 		=	[
							{ path: '',	component: HomePage	},
						]

@Component({
	template:	`
					<ion-item routerLink = "/" routerLinkActive = "/" >
						<ion-label>{{ "HOMEPAGE.MENU_ENTRY" | translate}}</ion-label>
						<ion-icon [name] = "'home' | rccIcon" slot = "end"></ion-icon>
					</ion-item>
				` 
})
export class MenuEntryHome {}

const menuEntries	=	[{position: 1, component: MenuEntryHome}]



@NgModule({
	imports: [
		RouterModule.forChild(routes),
		MainMenuModule.forChild(menuEntries),
		NotificationModule,
		SharedModule,
		QrCodeModule,
		TranslationsModule.forChild("HOMEPAGE", {en,de})
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

	static forChild(): ModuleWithProviders<HomePageModule>{
		return	{
					ngModule: HomePageModule
				}
	}
}
