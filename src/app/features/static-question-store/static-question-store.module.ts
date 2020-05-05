import 	{	NgModule 				} 	from '@angular/core'
import	{	
			DevModule,				
		}								from '@rcc/common'

import	{	
			QuestionaireModule,
			QUESTION_STORES		
		}								from '../questionaire'

import	{	StaticQuestionStore		}	from './static-question-store.service'


@NgModule({
	imports: [
		QuestionaireModule,
		DevModule.note('StaticQuestionStoreModule')
	],

	providers: [
		{ provide: QUESTION_STORES, useClass: StaticQuestionStore, multi: true }
	]
})
export class StaticQuestionStoreModule{}
