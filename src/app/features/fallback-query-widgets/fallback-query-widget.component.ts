//TODO, everything into its own component

import 	{ 	
			OnDestroy,
			Inject,
			Component			
		}									from '@angular/core'

import	{	Subscription				}	from 'rxjs'
import	{	take						}	from 'rxjs/operators'

import	{	Question					}	from '@rcc/core'
import	{	Query 						}	from '@rcc/features/queries'


@Component({
	selector:     'fallback-query-widget',
	templateUrl:   './fallback-query-widget.component.html',
	styleUrls:     ['./fallback-query-widget.component.scss']
})
export class FallbackQueryWidgetComponent implements OnDestroy {

	private	subscription	: Subscription

	constructor(
		public 	query		: Query,
	){

		this.query 			= query
		this.subscription 	= query.answerControl.valueChanges.subscribe({
			next : value => {


				if(query.question.type == 'string' 	&& typeof value != 'string') 	this.query.answerControl.setValue(String(value))
				if(query.question.type == 'decimal'	&& typeof value != 'number') 	this.query.answerControl.setValue(Number(value)||0)
				if(query.question.type == 'integer'	&& typeof value != 'number') 	this.query.answerControl.setValue(Number(value)||0)				

			}
		})
	}

	static widgetMatch(question:Question){ return 0 }

	ngOnDestroy(){
		this.subscription.unsubscribe()
	}
}

