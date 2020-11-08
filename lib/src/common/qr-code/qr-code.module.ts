import	{	
			Type,
			NgModule,
			Component,			
			ModuleWithProviders,
		}							from '@angular/core'
import	{	QRCodeModule 		}	from 'angularx-qrcode'
import	{	MainMenuModule		}	from '@rcc/common/main-menu'
import	{	HomePageModule		}	from '@rcc/common/home'
import	{	SharedModule		}	from '@rcc/common/shared.module'
import	{	
			IncomingDataModule,
			IncomingData		
		}							from '../incoming-data'
import	{	TranslationsModule	}	from '../translations'
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
		this.qrCodeService.scanAndAnnounce()
	}

}

const homePageEntries =	[
							{
								deps:	[QrCodeService],
								factory: (qrCodeService: QrCodeService) => ({
										position: 		1,
										icon:			'scan',
										label:			'QRCODE.SCAN',
										description:	'QRCODE.DESCRIPTION',
										action:			() => { qrCodeService.scanAndAnnounce() }
								})
							}
						]




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
		HomePageModule.forChild(homePageEntries)
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
