import	{	
			NgModule,
			ModuleWithProviders
		}										from '@angular/core'
import	{	
			DevModule,
			TransmissionModule,
			IncomingDataModule			
		}										from '@rcc/common'
import	{	WebsocketTransmissionService	}	from './websocket-transmission.service'
import	{	WEBSOCKET_DEFAULT_URL			}	from './websocket-transmisson.commons'


import	{
			AESprepare,
			AESencrypt,
			AESdecrypt
		}										from '@rcc/core'






@NgModule({
	providers: [
		WebsocketTransmissionService
	],
	imports: [
		DevModule.note('WebsocketTransmissionModule'),
		TransmissionModule.forChild(WebsocketTransmissionService),
		IncomingDataModule
	],
})
export class WebsocketTransmissionModule { 


	static forRoot(url:string): ModuleWithProviders<WebsocketTransmissionModule> {
	
		return 	{
					ngModule: 	WebsocketTransmissionModule,
					providers:	[
									{
										provide: 	WEBSOCKET_DEFAULT_URL,
										useValue: 	url
									}
								]
				}
	}
}
