import	{	InjectionToken 	}		from "@angular/core"
import 	{
			Question,
			QuestionConfig,
			ItemStore,
		}							from '@rcc/core'

import	{	ItemAction		}		from '@rcc/common'



export const QUESTION_STORES 			= new InjectionToken<ItemStore<QuestionConfig, Question>>('Question Stores')
export const QUESTION_ACTIONS 			= new InjectionToken<ItemAction<Question>>('Routes with question id, represented as :id, plus label for actions menu and optional icon name, optional handler')
