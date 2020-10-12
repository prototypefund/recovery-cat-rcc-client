import 	{ 	
			Component, 
			OnInit
		}							from '@angular/core'

import	{
			mergeMap
		}							from 'rxjs/operators'

import	{
			ActivatedRoute,
			ParamMap
		}							from '@angular/router'							

import	{	
			SymptomCheckMetaStore
		}							from '@rcc/features/symptom-checks/meta-store'

import	{
			SymptomCheck
		}							from '@rcc/core'



@Component({
	selector: 		'rcc-symptom-check-view',
	templateUrl: 	'./view-page.component.html',
	styleUrls: 		['./view-page.component.scss'],
})
export class SymptomCheckViewPage  implements OnInit {


	symptom_check: SymptomCheck

	constructor(
		private activatedRoute:			ActivatedRoute,		
		private symptomCheckMetaStore: 	SymptomCheckMetaStore
	){}


	ngOnInit() {

		this.activatedRoute.paramMap
		.pipe(
			mergeMap( 	(params	: ParamMap) 	=> this.symptomCheckMetaStore.get(params.get('id')) )
		)
		.subscribe(		(sc		: SymptomCheck)	=> this.symptom_check = sc ) 

		//will unsubscribe automaticcaly as part of route
  	}
}
