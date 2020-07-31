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
		let m:any 

		AESprepare()
		.then( (meta:any) => {
			m =  meta
			return AESencrypt( {test: 'abc', a:[1,2,3]}, meta.key, meta.iv) 
		})		
		.then( (x:any) => {console.log(x); return x} )
		.then( (x:any) => AESdecrypt(x, m.key, m.iv))
		.then( console.log)

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
