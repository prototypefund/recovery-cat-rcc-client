import	{	
			Injectable,
			Inject,
			Optional
		}								from '@angular/core'

import	{	
			RccTransmission,
			RccTransmissionService,	
			TRANSMISSION_SERVICE
		}								from './transmission.common'


// export class EncryptedTransmission implements RccTransmission {


// 	public key: string

// 	constructor(){

// 	}

// 	public async send(data:any) : Promise<any> {
		
		
		
// 	}



// }

@Injectable()
export class RccTransmissions {

	constructor(
		@Optional() @Inject(TRANSMISSION_SERVICE)
		public transmissionServices: RccTransmissionService[]
	){}

	public open(){
		const ts = this.transmissionServices.pop() //TODO: choose from settings

		return 
	}

	public read(){

	}

}