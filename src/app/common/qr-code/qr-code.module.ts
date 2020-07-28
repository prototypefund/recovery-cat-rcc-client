import	{	
			Type,
			NgModule,
			Component,			
			ModuleWithProviders,
		}							from '@angular/core'
import	{	QRCodeModule 		}	from 'angularx-qrcode'
import	{	MainMenuModule		}	from '@rcc/common/main-menu'
import	{	SharedModule		}	from '@rcc/common/shared.module'
import	{	
			IncomingDataModule,
			IncomingData		
		}							from '@rcc/common/incoming-data'
import	{	QrCodeComponent		}	from './qr-code/qr-code.component'
import	{	RccQrCodeScanner	}	from './qr-code.commons'
import	{	QrCodeService		}	from './qr-code.service'




@Component({
	template:	`
					<ion-item [button] = "true" (click) = "scan()">
						<ion-label>{{ "QRCODE.SCAN" | transloco }}</ion-label>
					</ion-item>
				`
})
export class MenuEntryQrCode {

	constructor(
		public qrCodeService	: QrCodeService,
		public incomingData		: IncomingData
	){}

	public scan(){
		Promise.resolve()
		.then(	()			=> this.qrCodeService.scan() )
		.then(	(data:any) 	=> this.incomingData.announce(data) )
	}

}




@NgModule({
	declarations: [
		QrCodeComponent,
		MenuEntryQrCode
	],
	imports:[
		IncomingDataModule,		
		QRCodeModule,
		SharedModule,
		MainMenuModule.forChild([MenuEntryQrCode]),
	],
	providers: [
		QrCodeService,
		RccQrCodeScanner
	],
	exports: [
		QrCodeComponent
	]
})
export class QrCodeModule { 
	
	static forRoot(scanService: Type<RccQrCodeScanner>): ModuleWithProviders<QrCodeModule> {
		return 	{
					ngModule: 	QrCodeModule,
					providers:	[
									{ provide: RccQrCodeScanner, useExisting: scanService }
								]
				}
	}
}
