import 	{ 	
			NgModule,
			Component 			
		}								from '@angular/core'

import	{	RouterModule			}	from '@angular/router'
			
import	{	ReactiveFormsModule		}	from '@angular/forms'

import 	{ 	
			SharedModule,
			MainMenuModule, 			
		}								from '@rcc/common'

import	{	CustomQuestionPage		}	from './custom-question.page/custom-question.page'
import	{	CustomQuestionStore		}	from './custom-question-store.service'
import	{	QUESTION_STORES			}	from '@rcc/features/questionaire'

const routes 		=	[
							{ path: 'questionaire/custom',	component: CustomQuestionPage },
						]

@Component({
	template:	`
					<ion-item routerLink = "questionaire/custom">
						<ion-label>{{ "CUSTOM_QUESTIONS.MENU_ENTRY" | transloco }}</ion-label>
					</ion-item>
				`
})
export class MenuEntryCustomQuestions {}

const menuEntries	=	[
							MenuEntryCustomQuestions
						]





@NgModule({
	declarations: [
		MenuEntryCustomQuestions,
		CustomQuestionPage
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild(menuEntries),
		ReactiveFormsModule
	],
	exports: [
		MenuEntryCustomQuestions,
		CustomQuestionPage
	],
	providers:[
		CustomQuestionStore,
		{ provide: QUESTION_STORES, useClass: CustomQuestionStore, multi: true}
	]
})
export class CustomQuestionsModule { }
