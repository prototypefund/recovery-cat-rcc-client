import 	{ 	
			NgModule,
			Component 			
		}								from '@angular/core'

import	{	RouterModule			}	from '@angular/router'
			
import	{	ReactiveFormsModule		}	from '@angular/forms'

import 	{ 	
			SharedModule,
			MainMenuModule,
			TranslationsModule			
		}								from '@rcc/common'

import	{	CustomQuestionPage		}	from './custom-question.page/custom-question.page'
import	{	CustomQuestionStore		}	from './custom-question-store.service'
import	{	QuestionaireModule		}	from '@rcc/features/questionaire'

import	de from './i18n/de.json'
import	en from './i18n/en.json'


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
export class MenuEntryCustomQuestion {}

const menuEntries	=	[
							MenuEntryCustomQuestion
						]


const itemActions 		= 	[
								{
									label: 		'DELETE',
									store: 		CustomQuestionStore,
									handler: 	(item: any, store: any) => store.delete(item),
									icon:		'delete'
								}
							]


@NgModule({
	declarations: [
		MenuEntryCustomQuestion,
		CustomQuestionPage
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild(menuEntries),
		QuestionaireModule.forChild([CustomQuestionStore], itemActions),
		TranslationsModule.forChild('CUSTOM_QUESTIONS', {de, en}),
		ReactiveFormsModule
	],
	exports: [
		MenuEntryCustomQuestion,
		CustomQuestionPage
	],
	providers:[
		CustomQuestionStore,
	]
})
export class CustomQuestionsModule { }
