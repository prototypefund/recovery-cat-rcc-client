import 	{ 	
			Component, 
			OnInit
		}									from '@angular/core'

import	{
			mergeMap
		}									from 'rxjs/operators'

import	{
			Router,
			ActivatedRoute,
			ParamMap
		}									from '@angular/router'							

import	{	
			SymptomCheckMetaStore
		}									from '@rcc/features/symptom-checks/meta-store'

import	{
			SymptomCheck
		}									from '@rcc/core'

import	{	WebsocketTransmissionService	}	from '@rcc/features/transmission'

@Component({
	templateUrl: 	'./share-page.component.html',
	styleUrls: 		['./share-page.component.scss'],
})
export class SymptomCheckSharePage  implements OnInit {


	public symptom_check	:	SymptomCheck
	public data				:	string
	public error			:	string
	public complete			:	boolean
	public id				:	string

	constructor(
		private router							: Router,
		private activatedRoute					: ActivatedRoute,		
		private symptomCheckMetaStore			: SymptomCheckMetaStore,
		private websocketTransmissionService	: WebsocketTransmissionService,

	){}


	ngOnInit() {

		this.activatedRoute.paramMap
		.pipe(
			mergeMap( 	(params	: ParamMap) => (this.id = params.get('id')) && this.symptomCheckMetaStore.get(this.id) )
		)
		.subscribe({		
			next:	(sc		: SymptomCheck)	=> 	this.setup(sc),  
			error:	(e:any)					=>  this.router.navigateByUrl(this.router.url.replace(this.id, 'null'))
		})

		//will unsubscribe automaticcaly as part of route
  	}

  	public async setup(symptom_check: SymptomCheck){

  		this.symptom_check 	= symptom_check 

  		const transmission 	= await this.websocketTransmissionService.open()

  		const receipt 		= transmission.send(symptom_check.config)

  		this.data = JSON.stringify(transmission.meta)

  		await receipt

  		this.complete = true

  	}
}
