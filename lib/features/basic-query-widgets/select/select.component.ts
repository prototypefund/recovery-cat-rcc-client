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
		}							from '@rcc/features/queries'


@Component({
	templateUrl: 	'./select.component.html',
	styleUrls: 		['./select.component.scss'],
})
export class SelectQueryWidgetComponent {
	
	static widgetMatch(question: Question): number{

		return 	question.options?.length>1
				?	1
				:	-1
	}



	constructor(
		public 	query		: Query,
	){

		this.query 			= query		

	}

}
