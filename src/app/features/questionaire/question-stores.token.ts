import	{	InjectionToken }		from "@angular/core"
import 	{
			Question,
			QuestionConfig,
			ItemStore
		}							from '@rcc/core'


export const QUESTION_STORES = new InjectionToken<ItemStore<Question,QuestionConfig>>('Question Stores')