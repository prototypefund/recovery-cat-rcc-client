import 	{	
			Component, 
			Type
		} 							from '@angular/core'

import	{	FormControl 		}	from '@angular/forms'

import	{	Question			}	from '@rcc/core'

import	{
			debounceTime
		}							from 'rxjs/operators'

import	{
			Questionaire
		}							from '../questionaire.service'

import	{	QuestionLabelComponent	}	from '../question-label/question-label.component'


@Component({
	selector: 		'rcc-questionaire.page',
	templateUrl: 	'./questionaire.page.html',
	styleUrls: 		['./questionaire.page.scss'],
})
export class QuestionairePage {

	public filterControl 	: FormControl					= new FormControl()

	constructor(
		public questionaire: Questionaire
	) { }

}
