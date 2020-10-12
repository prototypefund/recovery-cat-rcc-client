import 	{	
			Injectable,
			Inject,
			Optional
		} 									from '@angular/core'
import	{	
			Observable,
			Subscription
		}									from 'rxjs'
import	{	firstValueFrom				}	from '@rcc/core'		//TODO replace when rxjs 7 is ready
import	{	
			webSocket,
			WebSocketSubject,
		}									from 'rxjs/webSocket'

import	{	
			filter,
			map,
			take
		}									from 'rxjs/operators'
import	{	
			randomString,
			AESprepare,
			AESencrypt,
			AESdecrypt,						
		}									from '@rcc/core'
import	{	
			IncomingData,
			AbstractTransmissionService,
			RccTransmission
		}									from '@rcc/common'

import	{	WEBSOCKET_DEFAULT_URL		}	from './websocket-transmisson.commons'


export type WstClaimConfig = ["rcc-wst", string, string, string] // ["rcc-wst", channel, key, iv]

export function isWstClaimConfig(x:any): x is WstClaimConfig {
	if(! (x instanceof Array)) 		return false
	if(x[0] != 'rcc-wst')			return false
	if(typeof x[1]	!= 'string')	return false
	if(typeof x[2]	!= 'string')	return false
	if(typeof x[3]	!= 'string')	return false

	return true
}

export interface shareConfig {
	url		:	string,
	channel	:	string
	key		:	string,
	iv		:	string
}



export class Transmission implements RccTransmission{

	public channel			: string
	public url				: string
	public iv				: string
	public key				: string

	private ws				: WebSocketSubject<any>
	private subscription	: Subscription


	constructor(public config: shareConfig){
		if(!config.url) 				throw "WebsocketTransmissionService: Transmission.constructor: missing config.url and defaultUrl. Please use WebsocketTransmissionModule.forRoot(url) to set defaultUrl."		
		if(!config.url.match(/^wss:/))	throw "WebsocketTransmissionService: websocket url must start with 'wss:'."

		this.url 		= config.url
		this.channel 	= config.channel
		this.key		= config.key
		this.iv			= config.iv

	}



	public get meta(){
		return 	[
					'rcc-wst',
					this.channel,
					this.key,
					this.iv
				]
	}



	public async send(data: any): Promise<any> {

		if(this.ws) throw new Error("WebsocketTransmissionService -> Transmission.send() tried to send data multiple times.")

		const url 			=	this.url
		const channel		=	this.channel
		
		if(!data)				throw "WebsocketTransmissionService: missing data."

		const cipher		= 	await AESencrypt(data, this.key, this.iv)

		console.log(cipher)

		this.ws 			=  	webSocket(url)

		this.subscription 	=	this.ws.subscribe({ 
									next: 		x	=> { console.log (x) },
									error:		e	=> { throw e },
									complete:	()	=> { throw new Error("WebsocketTransmissionService.send(): connection closed before transmission was complete.") }
								})		//needs at least one subscription or .next() wont work


		//join, wait for seconds party:
		try	{

			const secondParty	=	firstValueFrom(
										this.ws.pipe(
											filter( 
												(message:any) => 	message 
																	&& 	message.type 	== 'joined' 
																	&&	message.self 	== false
																	&&	message.count	== 2
																	&& 	message.channel == channel
											),
										)
									)		

			this.ws.next({type:'join', channel})	

			await secondParty 

		}	
		catch(e) { throw new Error("WebsocketTransmissionService.send(): second party never showed up") }

		delete this.key
		delete this.iv


		// send data, wait for receipt:
		try { 
			const receipt		=	firstValueFrom(
										this.ws.pipe(
											filter( 
												(message:any) =>	message 
																	&&	message.type 	== "receipt" 
																	&&	message.receipt == "data"																
											)
										)
									)

			this.ws.next({type:'data', data: cipher})	

			await receipt 
		}
		catch(e) { throw new Error("WebsocketTransmissionService.send(): never got a receipt") }



		this.ws.complete()
	}

	public cancel() {
		this.ws.next({type:'cancel'})
		this.ws.complete()
	}

}




@Injectable()
export class WebsocketTransmissionService extends AbstractTransmissionService {




	constructor(
		@Optional() @Inject(WEBSOCKET_DEFAULT_URL)
		public defaultUrl	: string,
		public incomingData	: IncomingData
	){
		super()
	}



	public claimsAsConfig(data:any) {
		return isWstClaimConfig(data)
	}


	public async setup() : Promise<Transmission> {
		if(!this.defaultUrl)	throw "WebsocketTransmissionService.open(): missing defaultUrl. Please use WebsocketTransmissionModule.forRoot(url) to set defaultUrl."		

		const secret = await AESprepare()


		const shareConfig = {
								url:		this.defaultUrl,
								channel:	randomString(20),
								key:		secret.key,
								iv:			secret.iv
							}

		return new Transmission(shareConfig)
	}




	public async receive(config: WstClaimConfig) : Promise<any> {

		console.log('receiving', config)
		if(!isWstClaimConfig(config)) throw new Error("WebsocketTransmissionService.receive(): invalid config")

		const channel 	= config[1]	
		const key		= config[2] 
		const iv		= config[3]


		const ws 		= 	webSocket(this.defaultUrl)
		const data 		= 	firstValueFrom(
								ws.pipe(
									filter( (message:any) => message && message.type == 'data' ),
									map(	(message:any) => message.data ),
								)
							)

		//TODO: unsubscribe!

		ws.subscribe( x => console.log(x))	//needs at least one subscription or .next() wont work

		ws.next({type:'join', channel })	

		const cipher	= 	await data
		const result 	=	await AESdecrypt(cipher, key, iv)


		ws.next({type:'receipt', receipt: "data" })


		ws.complete()

		return result

	}
	
}

