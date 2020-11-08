import	{ 	
			NgModule,
			Component,
			ModuleWithProviders
		} 								from '@angular/core'
import 	{ 	RouterModule 			}	from '@angular/router'
import	{	MainMenuModule 			}	from '@rcc/common/main-menu/main-menu.module'
import	{	TranslationsModule		}	from '@rcc/common/translations'
import	{	SharedModule 			}	from '@rcc/common/shared.module'
import	{	NotificationModule		}	from '@rcc/common/notifications'
import	{	Factory					}	from '@rcc/common/interfaces'
import	{
			HomePageEntryConfig,
			provideHomePageEntries

		}								from './home.entries'

import	{	HomePageEntryComponent	}	from './entry/entry.component'
import	{	HomePageComponent 		}	from './home.page'

import	de from './i18n/de.json'
import	en from './i18n/en.json'



const routes 		=	[
							{ path: '',	component: HomePageComponent },
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
		TranslationsModule.forChild("HOMEPAGE", {en,de})
	],
	declarations: [
		HomePageComponent,
		MenuEntryHome,
		HomePageEntryComponent		
	],
	exports:[
		MenuEntryHome	
	],
})
export class HomePageModule {

	static forChild(entries: (HomePageEntryConfig | Factory<HomePageEntryConfig>)[]): ModuleWithProviders<HomePageModule>{
		return	{
					ngModule: HomePageModule,
					providers:	[
						provideHomePageEntries(entries),
					]
				}
	}
}
