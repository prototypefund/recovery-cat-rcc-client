import	{
			Component,
			OnInit
		} 								from '@angular/core'

import	{	Question				}	from '@rcc/core'

import	{	Questionaire			}	from '@rcc/features/questionaire'

@Component({
	selector: 		'rcc-query-run-page',
	templateUrl: 	'./query-run-page.component.html',
	styleUrls: 		['./query-run-page.component.scss'],
})
export class QueryRunPage implements OnInit {

	public questions: Question[] = []

	constructor(
		public questionaire: Questionaire
	) {}


	ngOnInit(){
		this.questionaire.get(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']) //TODO
		.then( questions => this.questions = questions)

	}

}
