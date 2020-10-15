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
			TranslationsModule,
			ItemAction,
			MetaAction,
		}								from '@rcc/common'

import	{	
			Question,
			QuestionConfig, 
			QuestionStore,
		}								from '@rcc/core'


import	{	Questionaire			}	from './questionaire.service'

import	{	
			QUESTION_STORES,
			QUESTION_ACTIONS,
			QUESTION_META_ACTIONS			
		}								from './questionaire.commons'

import	{	QuestionairePage 		}	from './questionaire.page/questionaire.page'
import	{	
			Id2QuestionPipe,
			AnswerToPipe,
			Options2TranslatablesPipe
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

const pipes					=	[
									Id2QuestionPipe,
									AnswerToPipe,
									Options2TranslatablesPipe
								]

@Component({
	template:	`
					<ion-item routerLink = "questionaire">
						<ion-label>{{ "QUESTIONAIRE.MENU_ENTRY" | translate }}</ion-label>
						<ion-icon [name] = "'question' | rccIcon" slot = "end"></ion-icon>
					</ion-item>
				`
})
export class MenuEntryQuestionaire {}





@NgModule({
	declarations: [
		MenuEntryQuestionaire,
		QuestionairePage,
		QuestionLabelComponent,
		...pipes
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild([MenuEntryQuestionaire]),
		MetaStoreModule.forChild(questionaireConfig),
		TranslationsModule.forChild("QUESTIONAIRE", {en, de} )
	],
	exports: [
		MetaStoreModule, //So other Module need not import this specifically
		...pipes
	],
	providers:[
		Questionaire
	]
})
export class QuestionaireModule extends BaseMetaStoreModule {

	static 	forChild(
				stores			: Type<QuestionStore>[],
				itemActions?	: ItemAction<Question>[],
				metaActions?	: MetaAction<Question>[]
			): ModuleWithProviders<QuestionaireModule> {


		const mwp = BaseMetaStoreModule.getModuleWithProviders(this, stores, itemActions, metaActions, QUESTION_STORES, QUESTION_ACTIONS, QUESTION_META_ACTIONS)
		return mwp

	}
}
