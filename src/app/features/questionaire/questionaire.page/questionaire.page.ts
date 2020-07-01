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

	public searchControl 	: FormControl					= new FormControl()
	public filterFn			: (item: Question) => boolean
	public showSearch		: boolean
	public questionLabel	: Type<any> 					= QuestionLabelComponent

	constructor(
		public questionaire: Questionaire
	) { }

	ngOnInit() {

		this.searchControl.valueChanges
		.pipe(debounceTime(200))
		.subscribe(search => {
			this.filterFn = (item: Question) => !!item.meaning.match(new RegExp(search,'gi'))
		})
	}

}
