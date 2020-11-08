import 	{	
			Component,				
			OnDestroy
		}								from '@angular/core'
import	{	Subscription			}	from 'rxjs'
import	{	DueData					}	from '@rcc/core'
import	{	MainHeaderComponent		}	from '@rcc/common/main-header'
import	{	DueQuestionsService		}	from './due-questions.service'


@Component({
	template:	`
					<ion-item routerLink = "due-questions">
						<ion-label>{{ "DUE_QUESTIONS.MENU_ENTRY" | transloco }}</ion-label>
						<ion-badge color="secondary">{{questionCount}}</ion-badge>
						<ion-icon [name] = " 'notification' | rccIcon" slot = "end"></ion-icon>
					</ion-item>
				`
})
export class DueQuestionsMainMenuEntry {

	public questionCount : number

	private subscription : Subscription

	constructor(
		public dueQuestionsService	: DueQuestionsService
	){

		this.dueQuestionsService
		.check$
		.subscribe( (result: DueData) => this.questionCount = result.questionIds.length )

		this.dueQuestionsService.get()
		
	}


	ngOnDestroy(){
		this.subscription.unsubscribe()
	}

}
