import	{	
			InjectionToken,
			Type
		}							from "@angular/core"

import 	{
			Question,
			QuestionConfig,
			ItemStore
		}							from '@rcc/core'


// -1: cant handle this kind of question
//  0: can handle this kind of question
//	1: good at handling this kind of question
// >2: specifically made to handle this kind of question	

export interface WidgetMatchFn {
	(question:Question): number 
}

export interface QueryWidget {
	new (args: any): any
	widgetMatch	: WidgetMatchFn	
}


export const QUERY_WIDGETS = new InjectionToken<QueryWidget>('Query Widget Components')

