import 	{ 	
			NgModule,
			Component 			
		}								from '@angular/core'

import	{	RouterModule			}	from '@angular/router'

import 	{ 	SharedModule 			}	from 'app/core'
import	{	CustomQuestionPage		}	from './custom-question.page/custom-question.page'


const routes 		=	[
							{ path: 'questionaire/custom',	component: CustomQuestionPage },
						]

@Component({
	template:	`
					<ion-item routerLink = "questionaire">
						<ion-label>{{ "QUESTIONAIRE.MENU_ENTRY" | transloco }}</ion-label>
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
		RouterModule.forChild(routes)
	],
	exports: [
		MenuEntryCustomQuestions,
		CustomQuestionPage
	]
})
export class CustomQuestionsModule { }
