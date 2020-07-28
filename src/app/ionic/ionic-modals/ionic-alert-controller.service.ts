import	{	
			Injectable, 	
		}								from '@angular/core'

import	{	
			AlertConfig,
			ButtonConfig,		
			ResolveButtonConfig,
			RejectButtonConfig,
			RccTranslationService
		}								from '@rcc/common'

import	{	
			AlertController,
		}								from '@ionic/angular'




@Injectable()
export class IonicAlertController {

	constructor(
		public alertController			: AlertController,
		public rccTranslationService	: RccTranslationService
	) {}

	public async present(config: AlertConfig) :Promise<any> {

		let resolve	: (...args:any) => any
		let reject	: (...args:any) => any

		let	promise = new Promise( (solve, ject) => { resolve = solve; reject = ject })

		const alert	= await this.alertController.create({
								cssClass: 	config.cssClass,
								header:		this.rccTranslationService.translate(config.header),
								subHeader:	this.rccTranslationService.translate(config.subHeader),
								message:	this.rccTranslationService.translate(config.message),
								buttons:	config.buttons.map( (button: ButtonConfig) => ({
												text:		this.rccTranslationService.translate(button.label),
												handler: 	() => {
																if(button.resolveAs	!== undefined) resolve(button.resolveAs)
																if(button.rejectAs 	!== undefined) resolve(button.rejectAs)
															}
											}))
							})

		alert.onWillDismiss().then( () => reject('dismissed'))
		alert.present()

		return await promise
	}

}
