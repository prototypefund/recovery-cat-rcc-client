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
import	{	QuestionaireModule		}	from '@rcc/features/questionaire'

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


const itemActions 		= 	[
								{
									label: 		'DELETE',
									store: 		CustomQuestionStore,
									handler: 	(item: any, store: any) => store.delete(item),
									icon:		'trash'
								}
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
		QuestionaireModule.forChild([CustomQuestionStore], itemActions),
		ReactiveFormsModule
	],
	exports: [
		MenuEntryCustomQuestions,
		CustomQuestionPage
	],
	providers:[
		CustomQuestionStore,
	]
})
export class CustomQuestionsModule { }
