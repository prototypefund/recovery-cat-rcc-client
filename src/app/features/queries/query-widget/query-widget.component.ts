import	{	
			Component,
			Input
		}						from '@angular/core'

import	{	Query			}	from '../query.class'

@Component({
	selector:     'rcc-query-widget',
	templateUrl:   './query-widget.component.html',
	styleUrls:     []
})
export class QueryWidgetComponent {
	@Input() 
	query: Query

	constructor(){}
}