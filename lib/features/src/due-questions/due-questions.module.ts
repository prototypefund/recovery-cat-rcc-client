import 	{
			NgModule,
			Component,
			APP_INITIALIZER
		}										from '@angular/core'

import	{	RouterModule					}	from '@angular/router'

import	{	
			SharedModule,
			MainMenuModule,
			NotificationModule,
			TranslationsModule
		}										from '@rcc/common'

import	{	JournalModule					}	from '../entries'
import	{	SymptomCheckMetaStoreModule		}	from '../symptom-checks/meta-store'

import	{	DueQuestionsService				}	from './due-questions.service'
import	{	DueQuestionsOverviewPage		}	from './overview-page/overview-page.component'
import	{	DueQuestionsHeaderItemComponent	}	from './due-questions-header-item.component'
import	{	DueQuestionsMenuEntry			}	from './due-questions-menu-entry.component'

import	en from './i18n/en.json'
import	de from './i18n/de.json'


const routes 				=	[
									{ 
										path: 		'due-questions',	
										component: 	DueQuestionsOverviewPage 
									}
								]

const notificationConfig 	=	{
									deps:		[DueQuestionsService],
									factory:	(dqs: DueQuestionsService) => dqs.count$
								}


@NgModule({
	imports: [
		JournalModule,
		SharedModule,
		SymptomCheckMetaStoreModule,
		MainMenuModule.forChild([{position:2, component: DueQuestionsMenuEntry}]),
		NotificationModule.forChild([notificationConfig]),
		RouterModule.forChild(routes),
		TranslationsModule.forChild("DUE_QUESTIONS", {en, de})		

	],
	declarations:[
		DueQuestionsMenuEntry,
		DueQuestionsOverviewPage,
		DueQuestionsHeaderItemComponent
	],
	providers: [
		DueQuestionsService,
		{
			provide: 		APP_INITIALIZER,
			useFactory: 	(dq: DueQuestionsService) => () => dq.onStartUp(),
			deps: 			[DueQuestionsService],
			multi: 			true
		}
	]
})
export class DueQuestionsModule { 


}
