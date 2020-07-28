import 	{	NgModule 				} 	from '@angular/core'
import	{	
			DevModule,				
		}								from '@rcc/common'

import	{	
			QuestionaireModule,
			QUESTION_STORES		
		}								from '@rcc/features'

import	{	StaticQuestionStore		}	from './static-question-store.service'


@NgModule({
	imports: [
		QuestionaireModule.forChild([StaticQuestionStore]),
		DevModule.note('StaticQuestionStoreModule')
	],
	providers: [
		StaticQuestionStore
	]
})
export class StaticQuestionStoreModule{}
