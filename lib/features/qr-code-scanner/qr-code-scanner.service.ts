import	{	Injectable			} from '@angular/core'
import	{	RccModalController	} from '@rcc/common'
import	{	QrCodeScanModal		} from './scan-modal/scan-modal.component'

@Injectable()
export class QrCodeScanner {

	constructor(
		public rccModalController: RccModalController
	){}

	public async scan() : Promise<any> {

		return await this.rccModalController.present(QrCodeScanModal,{})	

	}

}