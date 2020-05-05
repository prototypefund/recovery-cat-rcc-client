import	{	
			Injectable,
			Type,
			Inject,
			Optional
		} 								from '@angular/core'

import	{
			Question
		}								from '@rcc/core'

import	{
			QUERY_WIDGETS,
			QueryWidget
		}								from './query-widgets.commons'



export interface QueryWidgetByPriority {
	component	: QueryWidget,
	priority	: number
}	


@Injectable()
export class QueryWidgetsService {

	constructor(
		@Inject(QUERY_WIDGETS) @Optional()
		private queryWidgets: QueryWidget[]
	) { 
		console.log('QueryWidgetsService.constructor!')
	}

	public getBestWidgetMatch(question: Question): QueryWidget[] {

		return	this.queryWidgets
				.map( 		queryWidget 	=>	({					
													queryWidget,
													match:	queryWidget.widgetMatch 
															?	queryWidget.widgetMatch(question) 
															:	-1,
												})
				)
				.filter(	item 			=> item.match >= 0 )
				.sort( 		(item1, item2) 	=> Math.sign(item2.match - item1.match) )
				.map( 		item 			=> item.queryWidget)
	}
	
}
