import 	{ 	
			Component, 
			OnInit,
			OnDestroy,
			Injectable
		}										from '@angular/core'

import	{	Location						}	from '@angular/common'

import	{
			mergeMap
		}										from 'rxjs/operators'

import	{	
			ActivatedRoute,
			ActivatedRouteSnapshot,
			Router				
		}										from '@angular/router'							

import	{	
			SymptomCheckHomePath,
			SymptomCheckMetaStore
		}										from '@rcc/features/symptom-checks/meta-store'

import	{
			SymptomCheck,
			firstValueFrom
		}										from '@rcc/core'

import	{
			RccTransmission,
			RccToastController,
		}										from '@rcc/common'

import	{	Questionaire					}	from '../../../questions'
import	{	WebsocketTransmissionService	}	from '../../../transmission'




@Injectable()
export class SymptomCheckResolver {

	constructor( 
		private symptomCheckMetaStore	: SymptomCheckMetaStore,
		private router					: Router,
		private rccToastController		: RccToastController
	){}

	async resolve( route: ActivatedRouteSnapshot): Promise<any> {
		try {
			return	await this.symptomCheckMetaStore.get(route.params.id)		
		} catch(e) {
			this.rccToastController.failure('SYMPTOM_CHECK_SHARE.INVALID')
			this.router.navigate([SymptomCheckHomePath])			
			return 	false
		}
	}
}


@Component({
	templateUrl: 	'./share-page.component.html',
	styleUrls: 		['./share-page.component.scss'],
})
export class SymptomCheckSharePage  implements OnDestroy {


	public symptomCheck		:	SymptomCheck
	public transmission		:	RccTransmission
	public id				:	string
	public qr_data			:	string
	public invalid			:	boolean				= false
	public failed			:	boolean				= false
	public complete			:	boolean				= false

	constructor(
		private activatedRoute					: ActivatedRoute,
		private websocketTransmissionService	: WebsocketTransmissionService,
		private questionaire					: Questionaire,
		private rccToastController				: RccToastController,
		private location						: Location
	){
		this.symptomCheck = activatedRoute.snapshot.data.symptomCheck
		this.setup()
	}




  	ngOnDestroy() {  		
  		if(!this.transmission) return;
  		this.transmission.cancel()
  		this.rccToastController.info('SYMPTOM_CHECK_SHARE.TRANSMISSION.CANCELLED')
  	}



  	public async setup(){

  		const questions		= 	await this.questionaire.get( this.symptomCheck.questions.map( q => q.id) )
  		const data			= 	[
  									this.symptomCheck.config,
  									questions.map( question => question.config)
  								]

  		this.transmission 	= 	await this.websocketTransmissionService.setup()
  		this.qr_data 		= 	JSON.stringify(this.transmission.meta) //JSON.stringify(['rcc-wst',"scan-demo", "iWBMT2yPFYFqbbbiSpXCLPnRoBVzJb8G+npEFV4tWA0=","SUTBklneWT6akoHn"])

  		try {  			

  			const receipt 		= 	this.transmission.send(data)
  			await receipt
  			this.complete 		= 	true

  		} catch(e) {  			
  			this.failed = true
  		}
  	}



  	public retry() {
  		this.setup()
  	}

  	public done() {
  		delete this.transmission
  		this.location.back()
  	}

  	public cancel(){
  		this.location.back()  		  	
  	}
}
