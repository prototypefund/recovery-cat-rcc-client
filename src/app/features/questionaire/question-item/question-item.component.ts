import	{ 
			Component, 
			Input,
			Optional,
			Inject,
			ContentChild,
			TemplateRef 
		}								from '@angular/core'

import	{
			Router
		}								from '@angular/router'

import 	{	
			ActionSheetController 
		}								from '@ionic/angular'

import	{	
			Question,
			QuestionStore
		}								from '@rcc/core'

import	{	Questionaire			}	from '../questionaire.service'


import	{	
			QUESTION_ACTIONS,
			QuestionAction		
		}								from '../questionaire.commons'

//TODO:
import	{
			TranslocoService
		}								from '@ngneat/transloco'


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
		@Optional() @Inject(QUESTION_ACTIONS)
		public	question_actions			: QuestionAction[] = [],
		public 	questionaire				: Questionaire,
		public 	actionSheetController		: ActionSheetController,
		private	translocoService			: TranslocoService,		//TODO
		private router						: Router
	) {}

	//TODO check if no actions or only one are available!

	public async showActions(){

		const store_actions = this.questionaire.getStoreActions(this.question, this.store)

		const buttons: any[] = []

		if(store_actions.delete){
			buttons.push({
				text: this.translocoService.translate("QUESTIONAIRE.ACTIONS.DELETE"),
				role: 'destructive',
				icon: 'trash',
				handler: store_actions.delete
			})
		}

		buttons.push(
			...	this.question_actions.map( 
					action => 	({
									text: 		this.translocoService.translate(action.label),
									icon: 		action.icon || 'eye-outline',
									handler: 	() => this.router.navigateByUrl(action.path.replace(/:id/, this.question.id))
								})
				)
		)

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
