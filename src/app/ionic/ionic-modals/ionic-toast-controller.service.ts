import	{	Injectable				}	from '@angular/core'

import	{	
			ToastConfig,
			RccTranslationService
		}								from '@rcc/common'

import	{	ToastController			}	from '@ionic/angular'




@Injectable()
export class IonicToastController {

	constructor(
		public toastController			: ToastController,
		public rccTranslationService	: RccTranslationService
	) {}

	public async present(config: ToastConfig) :Promise<any> {

		let resolve	: (...args:any) => any
		let reject	: (...args:any) => any

		let	promise = new Promise( (solve, ject) => { resolve = solve; reject = ject })

		const toast	= await this.toastController.create({
								message: 	this.rccTranslationService.translate(config.message),
								duration:	2000,
								color:		config.color
							})

		toast.onWillDismiss().then( () => resolve('dismissed'))
		toast.present()

		return await promise
	}


	public async success(message: string): Promise<any>{
		return await this.present({message: message, color: 'success'})
	}

	public async failure(message: string): Promise<any>{
		return await this.present({message: message, color: 'warning'})
	}

	public async info(message: string): Promise<any>{
		return await this.present({message: message})
	}
}
