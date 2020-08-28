import	{	
			Component,
			OnDestroy
		}								from '@angular/core'
import	{	Location				}	from '@angular/common'
import	{	Subscription			}	from 'rxjs'
import	{	SymptomCheck			}	from '@rcc/core'
import	{	DueQuestionsService		}	from '../due-questions.service'


@Component({
	templateUrl: 	'./overview-page.component.html',
	styleUrls: 		['./overview-page.component.scss'],
})
export class DueQuestionsOverviewPage implements OnDestroy{

	public symptomChecks	: SymptomCheck[]	
	public questionIds		: string[]			 

	private subscription	: Subscription

	constructor(
		public dueQuestionsService	: DueQuestionsService,
		public location				: Location		
	) { 

		this.subscription =	this.dueQuestionsService.check$
							.subscribe(	(result: any) 	=>	{ 	
								this.symptomChecks 	= result.symptomChecks 
								this.questionIds 	= result.questionIds 
							})
		
		this.dueQuestionsService.get()
	}

	goBack() {
		this.location.back()
	}

	ngOnDestroy(){
		this.subscription.unsubscribe()
	}

}
