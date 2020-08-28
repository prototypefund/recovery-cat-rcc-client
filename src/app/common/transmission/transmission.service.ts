import	{	
			Injectable,
			Inject,
			Optional,
			OnDestroy,
			Type
		}								from '@angular/core'

import	{	SubscriptionLike		}	from 'rxjs'

import	{	
			RccTransmission,
			AbstractTransmissionService,	
			TRANSMISSION_SERVICE
		}								from './transmission.common'

import	{	IncomingData			}	from '@rcc/common/incoming-data'


@Injectable()
export class RccTransmissionService extends AbstractTransmissionService implements OnDestroy {

	protected subscriptions : SubscriptionLike [] = []

	constructor(
		@Optional() @Inject(TRANSMISSION_SERVICE)
		public 	transmissionServices	: RccTransmissionService[],
		private	incomingData			: IncomingData
	){
		super()
		this.listenToIncomingData()
	}


	protected listenToIncomingData(){

		this.subscriptions.push(
			this.incomingData
			.subscribe( this.receive.bind(this) )			
		)

		this.transmissionServices
	}

	public async setup(): Promise<RccTransmission> {

		const ts = this.transmissionServices.pop() //TODO: choose from settings

		return ts.setup()
	}

	public async receive(meta:any): Promise<any> {
		//TODO: maybe multiple transmission services can claim the config?
		//use settings to turn off transmission services

		return 	this.transmissionServices
				.find( transmissionService => transmissionService.claimsAsConfig(meta) )
				.receive(meta)
				.then( result => { this.incomingData.next(result); return result })
	}

	ngOnDestroy(){
		this.subscriptions.forEach( sub => sub.unsubscribe() )
	}

}