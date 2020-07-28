import 	{	Injectable 				} 	from '@angular/core'
import	{	
			Observable,
			firstValueFrom				
		}								from 'rxjs'
import	{	RccAbstractConnection	}	from '@common/connections'
import	{	
			webSocket
			WebSocketSubject,
		}								from 'rxjs/webSocket'

import	{	firstValueFrom			}	from 'rxjs'
import	{	
			filter,
			map,
			take
		}								from 'rxjs/operators'



export interface claimConfig {
	url		: 	string,
	channel	:	string,
}

export interface shareConfig {
	url		:	string,
	channel	:	string, 
	data	:	string
}


@Injectable()
export class WebsocketTransmissionService {


	public async share(config: shareConfig) : Promise<any> {

		const websockket 	=  	webSocket(config.url)

		const secondParty	=	firstValueFrom(
									webSocket
									.asObservable()
									.pipe(
										filter( 
											(message:any) => 	message 
																&& 	message.type 	== 'join' 
																&&	message.self 	== true
																&& 	message.channel == this.channel
										),
									)
								)
		
		const receipt		=	firstValueFrom(
									websocket
									.asObservable()
									.pipe(
										filter( 
											(message:any) =>	message 
																&&	message.type 	== "receipt" 
																&&	message.receipt == "data"																
										)
									)
								)

		webSocket.next({type:'join', channel:config.channel})	

		await secondParty

		webSocket.next({type:'data', data:config.data})	

		await receipt

		websocket.complete()

	}




	public async claim(config: claimConfig) : Promise<any> {

		const websocket 	= 	webSocket(config.url)
		const data 			= 	firstValueFrom(
									websocket								
									.asObservable()
									.pipe(
										filter( (message:any) => message && message.type == 'data' ),
										map(	(message:any) => message.data ),
									)
								)	

		webSocket.next({type:'join', channel:config.channel})	

		const result		= 	await data

		webSocket.next({type:'receipt', receipt:"data" })			

		websocket.complete()

		return result

	}
	
}

