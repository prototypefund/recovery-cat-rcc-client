import	{	
			Component, 
			OnInit, 		
			Input
		} 							from '@angular/core'


@Component({
	selector: 		'rcc-qr-code',
	templateUrl: 	'./qr-code.component.html',
	styleUrls:		 ['./qr-code.component.scss'],
})
export class QrCodeComponent implements OnInit {

	@Input()
	public data : any

	constructor() { }

	ngOnInit() {}

}
