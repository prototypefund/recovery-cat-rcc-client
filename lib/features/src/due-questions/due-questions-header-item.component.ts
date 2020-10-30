import 	{	
			Component,				
			OnDestroy
		}									from '@angular/core'
import	{	Subscription				}	from 'rxjs'
import	{	DueData						}	from '@rcc/core'
import	{	MainHeaderItemComponent		}	from '@rcc/common/main-header'
import	{	DueQuestionsService			}	from './due-questions.service'

@Component({
	template:	`
					<ng-template>
						<ion-button 
							*ngIf		= "questionCount > 0"
							routerLink  = "due-questions"
						>
							<ion-icon 
								[name] 	= "'notification' | rccIcon"
								slot	= "icon-only"
								color	= "secondary"
							>
							</ion-icon>			
						</ion-button>						
					</ng-template>`
})
			
export class DueQuestionsHeaderItemComponent extends MainHeaderItemComponent implements OnDestroy {

	public questionCount : number

	private subscription : Subscription

	constructor(
		public dueQuestionsService	: DueQuestionsService
	){
		super()

		this.dueQuestionsService
		.check$
		.subscribe( (result: DueData) => this.questionCount = result.questionIds.length )

		this.dueQuestionsService.get()
		
	}

	ngOnDestroy(){
		this.subscription.unsubscribe()
	}
}
