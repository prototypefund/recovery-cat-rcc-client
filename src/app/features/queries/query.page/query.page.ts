import 	{ 
			Component, 
			OnInit 
		} 						from '@angular/core'

import	{
			ActivatedRoute
		}						from '@angular/router'

import	{	Question		}	from '@rcc/core'

import	{

			Questionaire
		}						from '@rcc/features/questionaire'

import	{
			mergeMap,
			flatMap,
			take		
		}						from 'rxjs/operators'

import	{
			from
		}						from 'rxjs'

import	{
			Query
		}						from '../query.class'

// import	{
// 			ReportingService
// 		}						from '../../reports'

//TODO: Reports! and Query +submit


@Component({
  selector: 	'rcc-query-page',
  templateUrl: 	'./query.page.html',
  styleUrls: 	['./query.page.scss'],
})
export class QueryPage implements OnInit {

	public query: Query

	constructor(
		activatedRoute:		ActivatedRoute,
		questionaire:		Questionaire
		//ReportingService:	ReportingService
	) { 
		activatedRoute.paramMap
		.pipe(
			mergeMap( 	(params) 					=> params.get('id') ),
			mergeMap( 	(id			: string )		=> from(questionaire.lookUp([id])) ), //TODO: multiple matches?		
			flatMap( x => x),
			take(1)
		)
		.subscribe({
			next: question => 	this.query = new Query(question)
		})
	}

	ngOnInit() {}

}
