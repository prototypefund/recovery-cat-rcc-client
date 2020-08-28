import	{	InjectionToken 	}		from "@angular/core"
import 	{
			Question,
			QuestionConfig,
			ItemStore,
		}							from '@rcc/core'

import	{	
			ItemAction,
			MetaAction		
		}							from '@rcc/common'



export const QUESTION_STORES 			= new InjectionToken<ItemStore<QuestionConfig, Question>>('Question Stores')
export const QUESTION_ACTIONS 			= new InjectionToken<ItemAction<Question>>('Routes with question id, represented as :id, plus label for actions menu and optional icon name, optional handler')
export const QUESTION_META_ACTIONS		= new InjectionToken<MetaAction<Question>>('metaAction, any action realted to an item type.')
