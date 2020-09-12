import	{	
			Injectable,
			Inject,
			Optional,
			OnDestroy,
			Type
		}								from '@angular/core'

import	{	SubscriptionLike		}	from 'rxjs'
import	{	
			filter,
			tap					
		}								from 'rxjs/operators'

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
			.pipe(
				filter( this.isTransmissionConfig.bind(this) )
			)
			.subscribe( this.receiveAndAnnounce.bind(this))			
		)

		this.transmissionServices
	}

	public async setup(): Promise<RccTransmission> {

		const ts = this.transmissionServices.pop() //TODO: choose from settings

		return ts.setup()
	}

	public isTransmissionConfig(data:any){
		return !!this.getMatchingTransMissionService(data)
	}

	public getMatchingTransMissionService(data: any){
		return this.transmissionServices.find( ts => ts.claimsAsConfig(data) )
	}



	public async receive(meta:any): Promise<any> {
		//TODO: maybe multiple transmission services can claim the config?
		//use settings to turn off transmission services

		const matching_transmission_service = this.getMatchingTransMissionService(meta)

		if(!matching_transmission_service) throw new Error('RccTransmissionService.receive() not mathcing TransmissionService found.')

		const result						= await matching_transmission_service.receive(meta)

		return result
	}



	public async receiveAndAnnounce(meta:any){
		const result = await this.receive(meta)

		this.incomingData.next(result)
	}

	ngOnDestroy(){
		this.subscriptions.forEach( sub => sub.unsubscribe() )
	}

}