import	{	
			Component,
			Input
		}							from '@angular/core'

import	{	Query				}	from '../query.class'
import	{	ReportingService	}	from '../reporting/reporting.service'


@Component({
	selector:     'rcc-query-widget',
	templateUrl:   './query-widget.component.html',
	styleUrls:     []
})
export class QueryWidgetComponent {
	@Input() 
	query: Query

	constructor(
		private reportingService: ReportingService
	){ }


	submit():void{
		if(!this.query.complete) return null
		this.reportingService.submit(this.query.question.id, this.query.answer)
	}
}