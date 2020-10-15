import	{
			Component,
			Input,
			Optional
		} 						from '@angular/core'

import	{
			Question,
			Item
		}						from '@rcc/core'

import	{
			ItemLabelComponent
		}						from '@rcc/common'


@Component({
	selector: 		'rcc-question-label',
	templateUrl: 	'./question-label.component.html',
	styleUrls: 		['./question-label.component.scss'],
})
export class QuestionLabelComponent extends ItemLabelComponent {}
