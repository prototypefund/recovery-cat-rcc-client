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
import	{	TranslationsModule	}	from '@rcc/common/translations'
import	{	QrCodeComponent		}	from './qr-code/qr-code.component'
import	{	RccQrCodeScanner	}	from './qr-code.commons'
import	{	QrCodeService		}	from './qr-code.service'

import	en	from './i18n/en.json'
import	de	from './i18n/de.json'



@Component({
	template:	`
					<ion-item [button] = "true" (click) = "scan()">
						<ion-label>{{ "QRCODE.SCAN" | translate }}</ion-label>
						<ion-icon [name] = "'qr-code' | rccIcon" slot = "end"></ion-icon>
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
		.then(	(data:any) 	=> this.incomingData.next(data) )
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
		TranslationsModule.forChild('QRCODE', {en, de}),
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
