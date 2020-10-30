import	{
			Component,
			Input,
			HostListener
		}							from '@angular/core'

import	{
			Question
		}							from '@rcc/core'

import	{
			Query
		}							from '../../queries'


@Component({
	templateUrl: 	'./boolean.component.html',
	styleUrls: 		['./boolean.component.scss'],
})
export class BooleanQueryWidgetComponent {
	
	static widgetMatch(question: Question): number{

		return 	question.type == 'boolean'
				?	1
				:	-1
	}



	constructor(
		public 	query		: Query,
	){

		this.query 			= query		

	}

}
