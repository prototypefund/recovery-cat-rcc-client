import	{	
			Component,
			Input,
		}							from '@angular/core'

import	{	Query				}	from '../query.class'
import	{	RccToastController	}	from '@rcc/common'

@Component({
	selector:     'rcc-query-widget',
	templateUrl:   './query-widget.component.html',
	styleUrls:     ['./query-widget.component.scss']
})
export class QueryWidgetComponent {
	@Input() 
	query: Query

	@Input()
	submitButton: boolean


	constructor(
		public rccToastController: RccToastController
	){}

	submit(query: Query):void{
		this.query.submit()
		.then( 
			() => this.rccToastController.success("QUERIES.SUBMISSION.SUCESS"),
			() => this.rccToastController.failure("QUERIES.SUBMISSION.FAILURE"),
		)
	}
}