import 	{
			NgModule,
			Component,
		}							from '@angular/core'

import	{	RouterModule		}	from '@angular/router'
import	{	
			SharedModule,
			MainMenuModule		
		}							from '@rcc/common'
import	{	QueriesModule		}	from '@rcc/features/queries'
import	{	QueryRunPage		}	from './query-run-page/query-run-page.component'


const routes 				=	[
									{ path: 'due',	component: QueryRunPage	},
								]

@Component({
	template:	'<ion-item routerLink = "due"><ion-label>{{ "DUE_QUESTIONS.MENU_ENTRY" | transloco }}</ion-label></ion-item>'
})
export class MenuEntryDueQuestions {}


@NgModule({
	declarations: [
		QueryRunPage,
		MenuEntryDueQuestions
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild([MenuEntryDueQuestions]),
		QueriesModule
	],
	exports: [
		QueryRunPage,
		MenuEntryDueQuestions
	]
})
export class DueQuestionsModule { 


}
