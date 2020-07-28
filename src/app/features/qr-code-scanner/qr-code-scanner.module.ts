import	{	NgModule			}	from '@angular/core'
import	{	
			SharedModule,
			QrCodeModule	
		}							from '@rcc/common'
import	{	ZXingScannerModule	}	from '@zxing/ngx-scanner'
import	{	QrCodeScanner		}	from './qr-code-scanner.service'
import	{	QrCodeScanModal		}	from './scan-modal/scan-modal.component'


@NgModule({
	declarations: [
		QrCodeScanModal
	],
	imports: [	
		SharedModule,
		ZXingScannerModule,
		QrCodeModule.forRoot(QrCodeScanner),
	],
	providers: [
		QrCodeScanner
	],
	exports: [
		QrCodeScanModal
	]
})
export class QrCodeScannerModule { }
