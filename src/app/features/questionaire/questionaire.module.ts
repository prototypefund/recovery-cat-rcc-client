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
			BaseMetaStoreModule,
			ItemAction,
			TranslationsModule,
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
import	{	
			Id2QuestionPipe,
			AnswerToPipe
		}								from './questionaire.pipes'
import 	{	QuestionLabelComponent	} 	from './question-label/question-label.component'

import en from './i18n/en.json'
import de from './i18n/de.json'

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
		AnswerToPipe,
		QuestionLabelComponent
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild([MenuEntryQuestionaire]),
		MetaStoreModule.forChild(questionaireConfig),
		TranslationsModule.forChild("QUESTIONAIRE", {en, de} )
	],
	exports: [
		MenuEntryQuestionaire,
		QuestionairePage,
		Id2QuestionPipe,
		AnswerToPipe,
		QuestionLabelComponent
	],
	providers:[
		Questionaire
	]
})
export class QuestionaireModule extends BaseMetaStoreModule {

	static 	forChild(
				stores		: Type<QuestionStore>[],
				actions?	: ItemAction<Question>[]
			): ModuleWithProviders<QuestionaireModule> {


		const mwp = BaseMetaStoreModule.getModuleWithProviders(this, stores, actions, QUESTION_STORES, QUESTION_ACTIONS)
		return mwp

	}
}
