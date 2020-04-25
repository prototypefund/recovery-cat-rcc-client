import	{	InjectionToken }		from "@angular/core"
import 	{
			Question,
			QuestionConfig,
			ItemStore
		}							from 'app/rcc'


export const QUESTION_STORES = new InjectionToken<ItemStore<Question,QuestionConfig>>('Question Stores')