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
	templateUrl: 	'./share-page.component.html',
	styleUrls: 		['./share-page.component.scss'],
})
export class SymptomCheckSharePage  implements OnInit {


	public symptom_check	:	SymptomCheck
	public data				:	string
	public error			:	string
	public complete			:	boolean

	constructor(
		private activatedRoute:			ActivatedRoute,		
		private symptomCheckMetaStore: 	SymptomCheckMetaStore
	){}


	ngOnInit() {

		this.activatedRoute.paramMap
		.pipe(
			mergeMap( 	(params	: ParamMap) 	=> this.symptomCheckMetaStore.get(params.get('id')) )
		)
		.subscribe(		(sc		: SymptomCheck)	=> sc && this.setup(sc) ) 

		//will unsubscribe automaticcaly as part of route
  	}

  	public setup(symptom_check: SymptomCheck){
  		this.symptom_check = symptom_check 
  		this.data = JSON.stringify(symptom_check.config)
  	}
}
