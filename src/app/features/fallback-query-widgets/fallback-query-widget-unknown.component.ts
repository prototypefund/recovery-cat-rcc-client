import 	{ 	
			Inject,
			Component,
		}									from '@angular/core'

import	{	Question 			}			from '@rcc/core'
import	{	Query 				}			from '@rcc/features/queries'


@Component({
	selector:     'fallback-query-widget-unknown',
	templateUrl:   './fallback-query-widget-unknown.component.html',
	styleUrls:     ['./fallback-query-widget.component.scss']
})
export class FallbackQueryWidgetUnknownComponent {


	constructor(public query: Query){}

	static widgetMatch(question: Question){ return question.type == 'unknown' ? 2 : -1 }
}

