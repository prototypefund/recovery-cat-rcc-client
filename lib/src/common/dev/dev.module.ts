import 	{	
			NgModule,
			Component 		
		}							from '@angular/core'

import	{	RouterModule		}	from '@angular/router'

import	{	DevWarnings			}	from './dev.commons'
import	{	DevService			}	from './dev.service'
import	{	MainMenuModule		}	from '../main-menu'
import	{	SharedModule		}	from '../shared.module'	


import	{	DevPage				}	from './dev.page/dev.page'

import	{	ConsolePipe			}	from './dev.pipes'

const routes 		=	[
							{ path: 'dev',	component: DevPage	},
						]

@Component({
	template:	`
					<ion-item routerLink = "dev">
						<ion-label>{{ "DEV.MENU_ENTRY" | translate }}</ion-label>
						<ion-badge color="warning" slot ="end">{{devService.warnings.length}}</ion-badge>
						<ion-icon [name] = "'dev' | rccIcon" slot = "end"></ion-icon>
					</ion-item>
				`
})
export class MenuEntryQuestionaire {

	constructor(
		public devService: DevService
	){}
}

const menuEntries	=	[{position: -0.1, component:MenuEntryQuestionaire}]



@NgModule({
	declarations: [
		DevPage,
		MenuEntryQuestionaire,
		ConsolePipe
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild(menuEntries)
	],
	exports: [
		DevPage,
		MenuEntryQuestionaire,
		ConsolePipe
	],
	providers: [
		DevService,
		{provide: DevWarnings, useValue: {name: 'DevModule imported', note: "Some other module imported DevModule"}, multi:true}
	]
})
export class DevModule { 

	constructor(){
		console.warn('DevModule in use!')
	}

	static note(note: string){
		return 	{
					ngModule: 	DevModule,
					providers: 	[
									{provide: DevWarnings, useValue: { name: 'DevModule imported', note }, multi:true}
								]
				}
	}

}
