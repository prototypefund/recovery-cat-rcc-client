//TODO, everything into its own component

import 	{ 	
			OnDestroy,
			Inject,
			Component,
		}									from '@angular/core'

import	{
			Subscription
		}									from 'rxjs'

import	{	Question					}	from '@rcc/core'
import	{	Query 						}	from '@rcc/features/queries'


@Component({
	selector:     'fallback-query-widget',
	templateUrl:   './fallback-query-widget.component.html',
	styleUrls:     ['./fallback-query-widget.component.scss']
})
export class FallbackQueryWidgetComponent implements OnDestroy {

	public query		: Query
	public subscription	: Subscription

	constructor(query: Query){
		this.query 			= query
		this.subscription 	= query.formControl.valueChanges.subscribe({
			next : value => {
				if(query.question.type == 'string' 	&& typeof value != 'string') 	this.query.formControl.setValue(String(value))
				if(query.question.type == 'float'	&& typeof value != 'number') 	this.query.formControl.setValue(Number(value)||0)
				if(query.question.type == 'integer'	&& typeof value != 'number') 	this.query.formControl.setValue(Number(value)||0)				
			}
		})
	}

	static widgetMatch(question:Question){ return 0 }

	ngOnDestroy(){
		this.subscription.unsubscribe()
	}
}

