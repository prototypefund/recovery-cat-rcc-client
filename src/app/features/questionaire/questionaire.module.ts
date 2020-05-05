import 	{ 	
			NgModule, 
			Component,
			InjectionToken,
			ModuleWithProviders			
		} 								from '@angular/core'

import 	{ 	RouterModule 			}	from '@angular/router'

import	{	
			MainMenuModule, 		
			SharedModule
		}								from '@rcc/common'

import	{	
			ItemStore,
			Question,
			QuestionConfig 
		}								from '@rcc/core'


import	{	Questionaire			}	from './questionaire.service'
import	{	QUESTION_STORES			}	from './question-stores.token'
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

	// static forRoot(stores:(new () => ItemStore<Question, QuestionConfig>)[]): ModuleWithProviders {
	// 	return 	{
	// 				ngModule:	QuestionaireModule,
	// 				providers:	stores.map( storeClass => ({provide: QUESTION_STORES, useClass: storeClass, multi:true }))
	// 			}
	// }
}
