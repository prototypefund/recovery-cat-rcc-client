import 	{ 	
			NgModule, 
			Component,
			InjectionToken,
			ModuleWithProviders,
			Type		
		} 								from '@angular/core'

import 	{ 	RouterModule 			}	from '@angular/router'

import	{	
			SharedModule,
			MainMenuModule, 		
			MetaStoreModule,
			ItemAction,
		}								from '@rcc/common'

import	{	
			Question,
			QuestionConfig, 
			QuestionStore,
		}								from '@rcc/core'


import	{	Questionaire			}	from './questionaire.service'

import	{	
			QUESTION_STORES,
			QUESTION_ACTIONS			
		}								from './questionaire.commons'

import	{	QuestionairePage 		}	from './questionaire.page/questionaire.page'
import	{	Id2QuestionPipe			}	from './questionaire.pipes'
import 	{	QuestionLabelComponent	} 	from './question-label/question-label.component'


const routes 				=	[
									{ path: 'questionaire',	component: QuestionairePage	},
								]

const questionaireConfig 	=  	{
									itemClass:			Question,
									itemIcon:			'question',
									itemLabelComponent:	QuestionLabelComponent,
									serviceClass: 		Questionaire,

								}

@Component({
	template:	'<ion-item routerLink = "questionaire"><ion-label>{{ "QUESTIONAIRE.MENU_ENTRY" | transloco }}</ion-label></ion-item>'
})
export class MenuEntryQuestionaire {}





@NgModule({
	declarations: [
		MenuEntryQuestionaire,
		QuestionairePage,
		Id2QuestionPipe,
		QuestionLabelComponent
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild([MenuEntryQuestionaire]),
		MetaStoreModule.forChild(questionaireConfig)
	],
	exports: [
		MenuEntryQuestionaire,
		QuestionairePage,
		Id2QuestionPipe,
		QuestionLabelComponent
	],
	providers:[
		Questionaire
	]
})
export class QuestionaireModule {

	static 	forChild(
				stores		: Type<QuestionStore>[],
				actions?	: ItemAction<Question>[]
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
