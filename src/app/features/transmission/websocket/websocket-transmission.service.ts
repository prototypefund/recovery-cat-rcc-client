import 	{	
			Injectable,
			Inject,
			Optional
		} 								from '@angular/core'
import	{	
			Observable,
		}								from 'rxjs'
import	{	firstValueFrom			}	from '@rcc/core'		//TODO replace when rxjs 7 is ready
import	{	webSocket				}	from 'rxjs/webSocket'

import	{	
			filter,
			map,
			take
		}								from 'rxjs/operators'
import	{	
			randomString,
			AESprepare,
			AESencrypt,
			AESdecrypt			
		}								from '@rcc/core'		
import	{	
			Claim,
			IncomingData	
		}								from '@rcc/common'
import	{	WEBSOCKET_DEFAULT_URL	}	from './websocket-transmisson.commons'


export interface claimConfig {
	url		: 	string,
	channel	:	string,
	key		:	string,
	iv		:	string
}

export interface shareConfig {
	url		:	string,
	channel	:	string
	key		:	string,
	iv		:	string
}




//TODO turn into Factory, handle request and offers! maybe .prepare .send. .read



export class Transmission {

	public channel	: string
	public url		: string
	public iv		: string
	public key		: string

	constructor(public config: shareConfig){
		if(!config.url) 				throw "WebsocketTransmissionService: Transmission.constructor: missing config.url and defaultUrl. Please use WebsocketTransmissionModule.forRoot(url) to set defaultUrl."		
		if(!config.url.match(/^wss:/))	throw "WebsocketTransmissionService: websocket url must start with 'wss:'."

		this.url 		= config.url
		this.channel 	= config.channel
		this.key		= config.key
		this.iv			= config.iv
	}



	public get meta(){
		return 	{
					type:		'WebsocketTransmission',
					url:		this.url,
					channel:	this.channel,
					key:		this.key,
					iv:			this.iv
				}
	}



	public async send(data: any){

		const url 			=	this.url
		const channel		=	this.channel
		
		if(!data)				throw "WebsocketTransmissionService: missing config.data."

		const cipher		= 	await AESencrypt(data, this.key, this.iv)

		const ws 			=  	webSocket(url)
		const message$		=	ws.asObservable()

		ws.subscribe()		//needs at list one subscription or .next() wont work

		const secondParty	=	firstValueFrom(
									ws.pipe(
										filter( 
											(message:any) => 	message 
																&& 	message.type 	== 'joined' 
																&&	message.self 	== false
																&&	message.count	== 2
																&& 	message.channel == channel
										),
									)
								)
		
		const receipt		=	firstValueFrom(
									ws.pipe(
										filter( 
											(message:any) =>	message 
																&&	message.type 	== "receipt" 
																&&	message.receipt == "data"																
										)
									)
								)

		ws.next({type:'join', channel})	

		await secondParty

		delete this.key
		delete this.iv

		ws.next({type:'data', data: cipher})	

		await receipt

		console.log('got receipt')

		ws.complete()
	}


}




@Injectable()
export class WebsocketTransmissionService {

	constructor(
		@Optional() @Inject(WEBSOCKET_DEFAULT_URL)
		public defaultUrl	: string,
		public incomingData	: IncomingData
	){}


	public async open(url?:string) : Promise<Transmission> {
		if(!url && !this.defaultUrl)	throw "WebsocketTransmissionService.open(): missing url and defaultUrl. Please use WebsocketTransmissionModule.forRoot(url) to set defaultUrl."		

		const secret = await AESprepare()


		const shareConfig = {
								url:		url||this.defaultUrl,
								channel:	randomString(20),
								key:		secret.key,
								iv:			secret.iv
							}

		return new Transmission(shareConfig)
	}




	public async read(config: claimConfig) : Promise<any> {

		const ws 		= 	webSocket(config.url)
		const data 		= 	firstValueFrom(
								ws.pipe(
									filter( (message:any) => message && message.type == 'data' ),
									map(	(message:any) => message.data ),
								)
							)

		ws.subscribe()	//needs at list one subscription or .next() wont work

		ws.next({type:'join', channel:config.channel})	

		const cipher	= 	await data
		const result 	=	await AESdecrypt(cipher, config.key, config.iv)

		ws.next({type:'receipt', receipt:"data" })

		ws.complete()

		return result

	}


	public checkClaim(data:any): Claim | null {

		if(data.type != 'WebsocketTransmission') 	return null

		if(!data.url)								return null 
		if(typeof data.url.match != 'function')		return null
		if(!data.url.match(/^wss:/)) 				return null

		if(typeof data.channel 	!= 'string')		return null
		if(typeof data.key 		!= 'string')		return null
		if(typeof data.iv		!= 'string')		return null

		return 	{
					label: 	"WEBSOCKET_TRANSMISSIOM.CLAIM",
					import: () => 	{
										console.log('claimed websocket transmission')
										this.read(data)
										.then( (result:any) => this.incomingData.announce(result))
										
									}
				}
	}
	
}

