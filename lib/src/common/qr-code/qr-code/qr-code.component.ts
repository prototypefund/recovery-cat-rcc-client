import	{	
			Component, 
			OnInit, 		
			Input
		} 							from '@angular/core'

import	{
			QRCodeComponent
		}							from 'angularx-qrcode'

@Component({
	selector: 		'rcc-qr-code',
	templateUrl: 	'./qr-code.component.html',
	styleUrls:		 ['./qr-code.component.scss'],
})
export class QrCodeComponent extends QRCodeComponent {

	@Input()
	set data(data:any){
		this.qrdata = data
	}

	@Input() 
	color : string
}
