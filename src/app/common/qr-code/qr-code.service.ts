import 	{	Injectable 					} 	from '@angular/core'
import	{	RccModalController			}	from '@rcc/common/modals-provider'
import	{	QrCodePresentationComponent	}	from './qr-code-presentation/qr-code-presentation.component'
import	{	RccQrCodeScanner			}	from './qr-code.commons'

@Injectable()
export class QrCodeService {

	constructor(
		public rccModalController	: RccModalController,
		public rccQrCodeScanner		: RccQrCodeScanner,
	){}

	public present(data:string): Promise<any> {

		this.rccModalController.present(QrCodePresentationComponent, {})
		console.log('QrCodeService.present: ', data)

		return Promise.reject('QrCodeService.present not yet implemented.')
	}


	public async scan(): Promise<string> {
		return await this.rccQrCodeScanner.scan()					
	}
}