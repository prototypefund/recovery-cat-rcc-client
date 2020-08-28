import  {
			Component, 
			OnInit,
			OnDestroy, 
			ChangeDetectorRef
		}    				           		from '@angular/core'

import  {	ActivatedRoute     			}	from '@angular/router'
import  {	
			from,
			SubscriptionLike  			
		}									from 'rxjs'
import	{	
			mergeMap,
			mergeAll,
			flatMap,
			map,
			take
		}									from 'rxjs/operators'

import	{	
			Question,
			Entry,
			Report
		}									from '@rcc/core'
import	{	Questionaire				}	from '@rcc/features/questions'
import	{	EntryMetaStore				}	from '@rcc/features/entries'

@Component({
	selector: 'rcc-chart-page',
	templateUrl: './chart-page.component.html',
	styleUrls: ['./chart-page.component.scss'],
})
export class ChartPage implements OnInit, OnDestroy {

	
	public subscriptions	: SubscriptionLike[] 	= []
	public question			: Question
	public report			: Report	

	constructor(
		public activatedRoute	: ActivatedRoute,
		public questionaire		: Questionaire,
		public entryMetaStore	: EntryMetaStore,
		public changeDetector	: ChangeDetectorRef
	) { }

	ngOnInit() {

		const id$ =	this.activatedRoute.paramMap
					.pipe(
						map( (params) => 	params.get('id') ),
					)

		this.subscriptions.push(

			id$.pipe( 
				mergeMap( (id: string )=>	from(this.questionaire.get([id]) ) ),  //TODO: multiple matches?	
				mergeAll(),
				take(1),	
			)
			.subscribe( (question: Question) => { 
				this.question = question 
				this.changeDetector.detectChanges()
			}),

			id$.pipe( 
				mergeMap( (id: string ) =>	from( this.entryMetaStore.filter( entry => entry.questionId == id)  ) )//TODO ugly!
			)
			.subscribe( (entries: Entry[]) => {
				
				this.report = new Report(entries.map ( entry => entry.config))
				this.changeDetector.detectChanges()
			})

		)
		

	}

	ngOnDestroy(){
		this.subscriptions.forEach( sub => sub.unsubscribe() )
	}

}
