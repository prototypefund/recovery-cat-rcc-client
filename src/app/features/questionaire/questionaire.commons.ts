import	{	InjectionToken }		from "@angular/core"
import 	{
			Question,
			QuestionConfig,
			ItemStore
		}							from '@rcc/core'


export interface QuestionAction {
	label	: string,
	icon?	: string,
	path	: string
}

export const QUESTION_STORES 	= new InjectionToken<ItemStore<Question,QuestionConfig>>('Question Stores')
export const QUESTION_ACTIONS 	= new InjectionToken<QuestionAction>('Routes with question id, represented as :id, plus label for actions menu and optional icon name')