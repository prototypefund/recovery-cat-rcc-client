import 	{	
			Component, 
		} 						from '@angular/core'

import	{
			Questionaire
		}						from '../questionaire.service'

@Component({
	selector: 		'rcc-questionaire.page',
	templateUrl: 	'./questionaire.page.html',
	styleUrls: 		['./questionaire.page.scss'],
})
export class QuestionairePage {

	constructor(
		public questionaire: Questionaire
	) { }

}
