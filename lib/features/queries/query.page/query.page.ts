import 	{ 
			Component, 
			OnInit,
			ChangeDetectorRef 
		} 						from '@angular/core'

import	{
			ActivatedRoute
		}						from '@angular/router'

import	{	
			Question,
			Entry	
		}						from '@rcc/core'
import	{	Journal			}	from '@rcc/features/entries'

import	{	Questionaire	}	from '@rcc/features/questions'

import	{
			mergeMap,
			mergeAll,
			take,
			map		
		}						from 'rxjs/operators'

import	{	from			}	from 'rxjs'

import	{	Query			}	from '../query.class'



@Component({
  selector: 	'rcc-query-page',
  templateUrl: 	'./query.page.html',
  styleUrls: 	['./query.page.scss'],
})
export class QueryPage implements OnInit {

	public query: Query

	constructor(
		private	activatedRoute		: ActivatedRoute,
		private questionaire		: Questionaire,
		private	cd					: ChangeDetectorRef,
		private journal				: Journal
	){}

	ngOnInit() {

		this.activatedRoute.paramMap
		.pipe(
			map( 		(params) 					=> 	params.get('id') ),
			mergeMap( 	(id			: string )		=> 	from(this.questionaire.get([id]) ) ), //TODO: multiple matches?		
			mergeAll(),
			take(1),
			map(		(question	: Question)		=> 	new Query(
																question, 
																(id:string, answer:string, note:string)	=> this.journal.log(id,answer,note), 
																(entry: Entry)							=> this.journal.removeEntry(entry)
														)
			)
		)
		.subscribe({
			next: query => 	{
				this.query = query
				this.cd.detectChanges()
			}
		})

	}
}
