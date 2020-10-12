import 	{	Injectable 					} 	from '@angular/core'
import	{	RccModalController			}	from '@rcc/common/modals-provider'
import	{	IncomingData				}	from '@rcc/common/incoming-data'
import	{	RccQrCodeScanner			}	from './qr-code.commons'

@Injectable()
export class QrCodeService {

	constructor(
		public rccModalController	: RccModalController,
		public rccQrCodeScanner		: RccQrCodeScanner,
		public incomingData			: IncomingData
	){}

	public present(data:string): Promise<any> {
		return Promise.reject('QrCodeService.present not yet implemented.')
	}


	public async scan(): Promise<any> {
		const result = await this.rccQrCodeScanner.scan()	
		try{			
			return JSON.parse(result)
		}catch(e) {
			return result
		}
	}

	public async scanAndAnnounce(){
		const result = await this.scan()

		this.incomingData.next(result)
	}
}