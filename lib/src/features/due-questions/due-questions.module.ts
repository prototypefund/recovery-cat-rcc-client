import 	{
			NgModule,
			Component,
			APP_INITIALIZER
		}										from '@angular/core'

import	{	RouterModule					}	from '@angular/router'

import	{	
			SharedModule,
			MainMenuModule,
			HomePageModule,
			NotificationModule,
			TranslationsModule
		}										from '@rcc/common'

import	{	JournalModule					}	from '../entries'
import	{	SymptomCheckMetaStoreModule		}	from '../symptom-checks/meta-store'

import	{	DueQuestionsService				}	from './due-questions.service'
import	{	DueQuestionsOverviewPage		}	from './overview-page/overview-page.component'
import	{	DueQuestionsHeaderItemComponent	}	from './due-questions-header-item.component'
import	{	DueQuestionsMainMenuEntry		}	from './due-questions-main-menu-entry.component'
import	{	DueQuestionsHomePageEntry		}	from './due-questions-home-page-entry.component'

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


const homePageEntries		=	[
									{
										position:		2,
										label:			'DUE_QUESTIONS.MENU_ENTRY',
										icon:			'notification',
										route:			'/due-questions',
										childComponent: DueQuestionsHomePageEntry
									}
								]

const mainMenuEntries		=	[
									{
										position:2, 
										component: DueQuestionsMainMenuEntry
									}
								]

@NgModule({
	imports: [
		JournalModule,
		SharedModule,
		SymptomCheckMetaStoreModule,
		MainMenuModule.forChild(mainMenuEntries),
		HomePageModule.forChild(homePageEntries),
		NotificationModule.forChild([notificationConfig]),
		RouterModule.forChild(routes),
		TranslationsModule.forChild("DUE_QUESTIONS", {en, de})		

	],
	declarations:[
		DueQuestionsMainMenuEntry,
		DueQuestionsHomePageEntry,
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
