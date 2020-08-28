import 	{ 	
			Component, 
			OnInit
		}										from '@angular/core'

import	{
			mergeMap
		}										from 'rxjs/operators'

import	{
			Router,
			ActivatedRoute,
			ParamMap
		}										from '@angular/router'							

import	{	
			SymptomCheckMetaStore
		}										from '@rcc/features/symptom-checks/meta-store'

import	{
			SymptomCheck
		}										from '@rcc/core'

import	{	Questionaire					}	from '@rcc/features/questions'
import	{	WebsocketTransmissionService	}	from '@rcc/features/transmission'

@Component({
	templateUrl: 	'./share-page.component.html',
	styleUrls: 		['./share-page.component.scss'],
})
export class SymptomCheckSharePage  implements OnInit {


	public symptom_check	:	SymptomCheck
	public qr_data			:	string
	public error			:	string
	public complete			:	boolean
	public id				:	string

	constructor(
		private router							: Router,
		private activatedRoute					: ActivatedRoute,		
		private symptomCheckMetaStore			: SymptomCheckMetaStore,
		private websocketTransmissionService	: WebsocketTransmissionService,
		private questionaire					: Questionaire
	){}


	ngOnInit() {

		this.activatedRoute.paramMap
		.pipe(
			mergeMap( 	(params	: ParamMap) => (this.id = params.get('id')) && this.symptomCheckMetaStore.get(this.id) )
		)
		.subscribe({		
			next:	(sc		: SymptomCheck)	=> 	this.setup(sc).catch( e => this.error = e),  
			error:	(e:any)					=>  this.router.navigateByUrl(this.router.url.replace(this.id, 'null'))
		})

		//will unsubscribe automaticcaly as part of route
  	}

  	public async setup(symptom_check: SymptomCheck){

  		this.symptom_check 	= symptom_check

  		const questions		= await this.questionaire.get( symptom_check.questions.map( q => q.id) )

  		const data			= 	[
  									symptom_check.config,
  									questions.map( question => question.config)
  								]

  		console.log(data)

  		const transmission 	= await this.websocketTransmissionService.setup()

  		const receipt 		= transmission.send(data)

  		this.qr_data = JSON.stringify(transmission.meta)

  		await receipt

  		this.complete = true

  	}
}
