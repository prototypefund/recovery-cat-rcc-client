import	{	
			NgModule,
			ModuleWithProviders
		}										from '@angular/core'
import	{	
			DevModule,
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
	declarations: [],
	imports: [
		DevModule.note('WebsocketTransmissionModule'),
		IncomingDataModule.forChild({
			dependencies:	[WebsocketTransmissionService],
			checkClaim:		(data:any, websocketTransmissionService: WebsocketTransmissionService) => websocketTransmissionService.checkClaim(data)			
		})
	],
	providers: [
		WebsocketTransmissionService
	]
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
