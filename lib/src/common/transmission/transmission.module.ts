import 	{ 	
			NgModule,
			Type,
			ModuleWithProviders 			

		}									from '@angular/core'

import	{	
			TRANSMISSION_SERVICE,	
			AbstractTransmissionService
		}									from './transmission.common'

import	{	
			RccTransmissionService	
		}									from './transmission.service'


@NgModule({
	providers: [
		RccTransmissionService
	]
})
export class TransmissionModule { 

	constructor(
		rccTransmissionService	: RccTransmissionService
	){}

	static forChild( transmissionServiceClass: Type<AbstractTransmissionService> ): ModuleWithProviders<TransmissionModule>{
		return 	{
					ngModule: TransmissionModule,
					providers: 	[
									{provide: TRANSMISSION_SERVICE, useExisting: transmissionServiceClass, multi: true }
								]
				}
	}

}
