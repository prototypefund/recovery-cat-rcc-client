import	{	
			Injectable,
			Type

		}								from '@angular/core'

import	{	
			ModalProviderModule,
		}								from '@rcc/common'

import	{	
			ModalController,
		}								from '@ionic/angular'


@Injectable()
export class IonicModalController {

	constructor(
		public modalController: ModalController
	){}

	public async present(component: Type<any>, data: any ){

		const modal		= await this.modalController.create({component, componentProps: data})

		await modal.present()

		const result	= await modal.onDidDismiss()

		return result.data

	}

	public dismiss(data:any){
		this.modalController.dismiss(data)
	}

}


