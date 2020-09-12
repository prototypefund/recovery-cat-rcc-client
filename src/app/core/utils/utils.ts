
//Thanks to https://stackoverflow.com/questions/105034/how-to-create-guid-uuid
export function uuidv4() {
	// @ts-ignore
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16) )
}

export function adHocId(){
	return uuidv4()
}

function byte2alphanumeric(x:number) {
	const	h = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

	return	x < 248
			?	h.charAt(x % 4)
			:	''
}

export function randomString(length: number): string{

	const 	a = new Uint8Array(length)    
	
	return toBase64(window.crypto.getRandomValues(a)).substr(0,length)

}



export function toBase64 (b: ArrayBuffer | Uint8Array): string {
	return btoa(String.fromCharCode(...new Uint8Array(b)))
}


export function fromBase64(base64: string) : Uint8Array{
	return Uint8Array.from(atob(base64), c => c.charCodeAt(0))
}


export async function AESprepare(): Promise<{key:string, iv:string}>{

	const iv 			= 	crypto.getRandomValues(new Uint8Array(12))
	const key			= 	await	window.crypto.subtle.generateKey(
										{
											name: "AES-GCM",
											length: 256
										},
										true,
										["decrypt", "encrypt"]
									)

	const u8_key		=	await crypto.subtle.exportKey('raw', key)

	const b64_key		=	toBase64(u8_key)
	const b64_iv		= 	toBase64(iv)

	return {
				key: 	b64_key, 
				iv:		b64_iv
			}
}

export async function AESencrypt(data:any, b64_key: string, b64_iv: string): Promise<string>{
	const textEncoder	=	new TextEncoder()
	const encoded_data	= 	textEncoder.encode(JSON.stringify(data))	
	
	const u8_iv			=	fromBase64(b64_iv)
	const u8_key		=	fromBase64(b64_key)

	const key			=	await	crypto.subtle.importKey(
										'raw', 
										u8_key, 
										{
											name: "AES-GCM",
											length: 256,
										},
										false,
										["decrypt", "encrypt"]
									)

	const cipher		= 	await 	crypto.subtle.encrypt(
										{
											name: "AES-GCM",
											iv: u8_iv
										},
										key,
										encoded_data
									)
	
	const b64_cipher	= 	toBase64(cipher)	

	return b64_cipher
}


export async function AESdecrypt(b64_cipher:string, b64_key:string, b64_iv:string) : Promise<any> {
	const textDecoder 	= 	new TextDecoder()

	const u8_cipher		=	fromBase64(b64_cipher)
	const u8_iv			=	fromBase64(b64_iv)
	const u8_key		=	fromBase64(b64_key)


	const key			=	await	crypto.subtle.importKey(
										'raw', 
										u8_key, 
										{
											name: "AES-GCM",
											length: 256,
										},
										false,
										["decrypt", "encrypt"]
									)

	const decrypted 	= 	await 	crypto.subtle.decrypt(
										{
											name: "AES-GCM",
											iv: u8_iv
										},
										key,
										u8_cipher
									)


		const data			= 	JSON.parse(textDecoder.decode(decrypted))


		return data
}


export interface pseudoSubject {
	next		:	(value:any) => any
	subscribe	:	(...args:any[]) => any
}


export function linkSubjects(x:pseudoSubject, y:pseudoSubject): any[] { 
	const subscriptions	= 	[]
	let x_value:any  
	let y_value:any

	const x_obs			=	{
								value:		undefined as any,
								next: 		(n:any) => {
												if(n != y_value){
													y_value = n
													y.next(n)
												} 
											}
							}
	const y_obs			=	{		
								value:		undefined as any,	
								next: 		(n:any) => {
												if(n != x_value){
													x_value = n
													x.next(n)
												} 
											}
							}

	subscriptions.push(
		x.subscribe(x_obs),
		y.subscribe(y_obs)
	)

	return subscriptions
}


export function sortByKeyFn(key: string, reverse?		: boolean 						) : (x:any, y:any) => number
export function sortByKeyFn(key: string, secondary_key?	: string, 	reverse?: boolean 	) : (x:any, y:any) => number
export function sortByKeyFn(key: string, x?				: any, 		y?		: any		) : (x:any, y:any) => number
{

	const secondary = 	typeof x == "string" 
						?	x 
						:	null

	const reverse 	=	secondary
						?	!!y
						:	!!x

	const dir		=	reverse ? -1 : 1

	return 	(item1:any, item2:any) => {
				const pos1 = (item1 as any)[key]
				const pos2 = (item2 as any)[key]

				if(pos1 === pos2 ){

					return 	typeof secondary == "string"
							?	sortByKeyFn(secondary, reverse)(item1, item2)
							:	0

				}

				if( (pos1<0) && !(pos2<0))	return +1*dir
				if( (pos2<0) && !(pos1<0))	return -1*dir

				if(pos1 === undefined && (pos2 >= 0) ) return +1*dir
				if(pos2 === undefined && (pos1 >= 0) ) return -1*dir


				return 	pos1 > pos2
						?	+1*dir
						:	-1*dir
			}

}


//TODO: Remove when rxjs 7 is released

import { Observable, EmptyError, Subscription } from 'rxjs'

export function firstValueFrom<T>(source$: Observable<T>) {

	return 	new Promise<T>( (resolve, reject) => {

				const subs = new Subscription()
				
				subs.add(
					source$.subscribe({
						next: value => {
							resolve(value);
							subs.unsubscribe();
						},
						error: reject,
						complete: () => {
							reject(new EmptyError());
						},
					})
				)
			})
}