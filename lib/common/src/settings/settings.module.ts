import	{	
			NgModule,
			ModuleWithProviders,
			Component
		}									from '@angular/core'
import	{	CommonModule				}	from '@angular/common'
import 	{ 	RouterModule 				}	from '@angular/router'
import	{	ReactiveFormsModule			}	from '@angular/forms'

import	{	MainMenuModule				}	from '../main-menu'
import	{	MainHeaderModule			}	from '../main-header'
import	{	TranslationsModule			}	from '../translations'
import	{	IconsModule					}	from '../icons'
import 	{ 	IonicModule 				}	from '@ionic/angular'


import	{
			SettingConfig,
			SETTING_CONFIGS
		}									from './settings.commons'

import	{	SettingsService				}	from './settings.service'

import	{	OverviewPageComponent		}	from './overview-page/overview-page.component'

import en from './i18n/en.json'
import de from './i18n/de.json'




@Component({
	template:	`
					<ion-item routerLink = "/settings" routerLinkActive = "/settings" >
						<ion-label>{{ "SETTINGS.MENU_ENTRY" | translate }}</ion-label>
						<ion-icon [name] = "'settings' | rccIcon" slot = "end"></ion-icon>
					</ion-item>
				` 
})
export class MenuEntrySettings {}

const menuEntries	=	[{position: -1, component: MenuEntrySettings}]

const routes		=	[
							{
								path: 		'settings',
								component:	OverviewPageComponent
							}
						]


@NgModule({
	providers: [
		SettingsService
	],
	declarations: [
		MenuEntrySettings,
		OverviewPageComponent
	],
	imports: [
		ReactiveFormsModule,
		CommonModule,
		IonicModule,
		TranslationsModule.forChild("SETTINGS", {en, de}),
		IconsModule,
		MainHeaderModule,
		MainMenuModule.forChild(menuEntries),
		RouterModule.forChild(routes)
	]
})
export class SettingsModule { 

	static forChild(settingConfigs: SettingConfig[]): ModuleWithProviders<SettingsModule>{
		return	{
					ngModule: 	SettingsModule,
					providers: 	[
									...settingConfigs.map(config => ({
										provide: 	SETTING_CONFIGS,
										deps:		config.deps,
										useFactory:	(...args:any) => ({
														...config,
														change$: 	config.change$ 	|| config.changeFactory(...args),
													}),
										multi:		true
									}))

								]
				}
	}
}
