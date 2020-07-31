import 	{ 	
			Type,
			NgModule,
			ModuleWithProviders			

		}							from '@angular/core'

import	{	RccModalController	}	from './dummy-modal-controller.service'
import	{	RccAlertController	}	from './dummy-alert-controller.service'
import	{	RccToastController	}	from './dummy-toast-controller.service'





export interface ModalConfig {
	modalController?: Type<RccModalController>
	alertController?: Type<RccAlertController>
	toastController?: Type<RccToastController>
}


@NgModule()
export class ModalProviderModule { 

	static forRoot(modalConfig: ModalConfig): ModuleWithProviders<ModalProviderModule>{
		return 	{
					ngModule: 	ModalProviderModule,
					providers: 	Object.keys(modalConfig).map( (key:string) => {
									switch(key){
										case 'modalController': return { provide: RccModalController, useExisting: modalConfig.modalController }
										case 'alertController': return { provide: RccAlertController, useExisting: modalConfig.alertController }
										case 'toastController': return { provide: RccToastController, useExisting: modalConfig.toastController }
										default: throw "ModalProviderModule.forRoot(): invalid key in config: "+key
									}
								})
				}
	}
}
