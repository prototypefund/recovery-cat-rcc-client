import	{	NgModule 				}	from '@angular/core'
import	{	ModalProviderModule		}	from '@rcc/common'
import	{	IonicModalController	}	from './ionic-modal-controller.service'
import	{	IonicAlertController	}	from './ionic-alert-controller.service'
import	{	IonicToastController	}	from './ionic-toast-controller.service'





@NgModule({
	providers:[
		IonicModalController,
		IonicAlertController,
		IonicToastController
	],
	imports: [
		ModalProviderModule.forRoot({
			modalController: IonicModalController,
			alertController: IonicAlertController,
			toastController: IonicToastController
		})
	]
})
export class IonicModalsModule {}
