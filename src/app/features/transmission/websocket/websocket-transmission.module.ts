import	{	NgModule					}	from '@angular/core'
import	{	
			DevModule,
			IncomingDataModule			
		}									from '@rcc/common'
import	{	WebsocketTranmissionService	}	from './websocket-transmission.service'



@NgModule({
	declarations: [],
	imports: [
		DevModule.note('WebsocketTransmissionModule'),
		IncomingDataModule.forChild({
			dependencies:	[WebsocketTranmissionService],
			//claim: 			(data:any, websocketTranmissionService:WebsocketTranmissionService) => websocketTranmissionService.claim(data), TODO
			//import:			(data:any, websocketTranmissionService:WebsocketTranmissionService) => websocketTranmissionService.claim(data), TODO
		})
	],
	providers: [
		WebsocketTranmissionService
	]
})
export class WebsocketTransmissionModule { 

}
