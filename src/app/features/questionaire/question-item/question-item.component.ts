import	{ 
			Component, 
			Input,
			ContentChild,
			TemplateRef 
		}							from '@angular/core'

import 	{	
			ActionSheetController 
		}							from '@ionic/angular'

import	{	
			Question,
			QuestionStore
		}							from '@rcc/core'

import	{
			Questionaire		
		}							from '../questionaire.service'


//TODO:
import	{
			TranslocoService
		}							from '@ngneat/transloco'


@Component({
	selector: 		'rcc-question-item',
	templateUrl: 	'./question-item.component.html',
	styleUrls: 		['./question-item.component.scss'],
})
export class QuestionItemComponent {

	@Input()
	question	: Question

	@Input()
	store		: QuestionStore

	constructor(
		public 	questionaire				: Questionaire,
		public 	actionSheetController		: ActionSheetController,
		private	translocoService			: TranslocoService		//TODO
	) {}

	//TODO check if no actions or only one are available!

	public async showActions(){

		const actions = this.questionaire.getActions(this.question, this.store)

		const buttons: any[] = []

		if(actions.delete){
			buttons.push({
				text: this.translocoService.translate("QUESTIONAIRE.ACTIONS.DELETE"),
				role: 'destructive',
				icon: 'trash',
				handler: actions.delete
			})
		}

		buttons.push({
				text: this.translocoService.translate("QUESTIONAIRE.ACTIONS.CANCEL"),
				icon: 'close',
				role: 'cancel'				
		})

		const actionSheet = await this.actionSheetController.create({
			//header: '{{}}'
			buttons
		})

		await actionSheet.present()
	}
}
