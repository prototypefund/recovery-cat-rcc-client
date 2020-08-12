import 	{ 
			Component, 
			OnInit,
			ChangeDetectorRef 
		} 						from '@angular/core'

import	{
			ActivatedRoute
		}						from '@angular/router'

import	{	Question		}	from '@rcc/core'

import	{	Questionaire	}	from '@rcc/features/questionaire'

import	{
			mergeMap,
			mergeAll,
			take,
			map		
		}						from 'rxjs/operators'

import	{
			from
		}						from 'rxjs'

import	{	Query			}	from '../query.class'


//TODO: Reports! and Query +submit


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
		private	cd					: ChangeDetectorRef
	){}

	ngOnInit() {

		this.activatedRoute.paramMap
		.pipe(
			map( 		(params) 					=> params.get('id') ),
			mergeMap( 	(id			: string )		=> from(this.questionaire.get([id]) ) ), //TODO: multiple matches?		
			mergeAll(),
			take(1),
			map(		(question	: Question)		=> new Query(question) )
		)
		.subscribe({
			next: query => 	{
				this.query = query
				this.cd.detectChanges()
			}
		})

	}

}
