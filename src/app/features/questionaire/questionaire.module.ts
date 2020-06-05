import 	{ 	
			NgModule, 
			Component,
			InjectionToken,
			ModuleWithProviders,
			Type		
		} 								from '@angular/core'

import 	{ 	RouterModule 			}	from '@angular/router'

import	{	
			MainMenuModule, 		
			SharedModule
		}								from '@rcc/common'

import	{	
			Question,
			QuestionConfig, 
			QuestionStore,
		}								from '@rcc/core'


import	{	Questionaire			}	from './questionaire.service'

import	{	
			QuestionAction,
			QUESTION_STORES,
			QUESTION_ACTIONS			
		}								from './questionaire.commons'
import	{	QuestionItemComponent	}	from './question-item/question-item.component'
import	{	QuestionairePage 		}	from './questionaire.page/questionaire.page'


const routes 		=	[
							{ path: 'questionaire',	component: QuestionairePage	},
						]

@Component({
	template:	'<ion-item routerLink = "questionaire"><ion-label>{{ "QUESTIONAIRE.MENU_ENTRY" | transloco }}</ion-label></ion-item>'
})
export class MenuEntryQuestionaire {}

const menuEntries	=	[
							MenuEntryQuestionaire
						]




@NgModule({
	declarations: [
		MenuEntryQuestionaire,
		QuestionItemComponent,
		QuestionairePage,
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild(menuEntries),
	],

	exports: [
		MenuEntryQuestionaire,
		QuestionItemComponent,
		QuestionairePage,
	],
	providers:[
		Questionaire
	]
})
export class QuestionaireModule {

	static 	forChild(
				stores		: Type<QuestionStore>[],
				actions?	: QuestionAction[] 
			): ModuleWithProviders {
		return 	{
					ngModule:	QuestionaireModule,
					providers:	[
									...(stores||[])	.map( 	storeClass	=> ({provide: QUESTION_STORES,	useClass: storeClass, 	multi:true })),
									...(actions||[]).map( 	action 		=> ({provide: QUESTION_ACTIONS,	useValue: action, 		multi:true })),

								]
				}
	}
}
