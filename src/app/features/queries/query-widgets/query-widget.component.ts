import	{	
			Component,
			Input
		}							from '@angular/core'

import	{	Journal				}	from '@rcc/features/journal'
import	{	Query				}	from '../query.class'


@Component({
	selector:     'rcc-query-widget',
	templateUrl:   './query-widget.component.html',
	styleUrls:     []
})
export class QueryWidgetComponent {
	@Input() 
	query: Query

	constructor(
		private journal: Journal
	){ }


	submit():void{
		if(!this.query.complete) return null
		this.journal.log(this.query.question.id, this.query.answer)
	}
}