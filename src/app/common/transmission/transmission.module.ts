import 	{ 	
			NgModule,
			Type,
			ModuleWithProviders 			

		}								from '@angular/core'

import	{	
			TRANSMISSION_SERVICE,	
			RccTransmissionService
		}								from './transmission.common'

import	{	
			RccTransmissions	
		}								from './transmission.service'


@NgModule({
	providers: [
		
	]
})
export class TransmissionModule { 

	static forRoot(transmissionServiceClass: Type<RccTransmissionService>): ModuleWithProviders<TransmissionModule>{
		return 	{
					ngModule: TransmissionModule,
					providers: 	[
									{provide: TRANSMISSION_SERVICE, useExisting: transmissionServiceClass, multi: true }
								]
				}
	}

}
