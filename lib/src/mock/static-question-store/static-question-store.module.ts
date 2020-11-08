import 	{	NgModule 				} 	from '@angular/core'
import	{	
			DevModule,				
			TranslationsModule
		}								from '@rcc/common'

import	{	
			QuestionaireModule,
			QUESTION_STORES		
		}								from '@rcc/features'

import	{	StaticQuestionStore		}	from './static-question-store.service'

import en from './i18n/en.json'
import de from './i18n/de.json'

@NgModule({
	imports: [
		QuestionaireModule.forChild([StaticQuestionStore]),
		TranslationsModule.forChild("STATIC_QUESTION_STORE", {de ,en}),
		DevModule.note('StaticQuestionStoreModule')
	],
	providers: [
		StaticQuestionStore
	]
})
export class StaticQuestionStoreModule{}
