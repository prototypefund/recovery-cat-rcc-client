import	{ 	
			Component, 
			OnInit,
			Input,
			ViewChild,
			ChangeDetectorRef
		} 								from '@angular/core'
import	{	FormControl				}	from '@angular/forms'
import	{	
			RccModalController, 
			RccToastController		
		}								from '@rcc/common'
import	{	ZXingScannerComponent 	}	from '@zxing/ngx-scanner'

@Component({
	selector: 		'rcc-qr-code-scanner',
	templateUrl: 	'./scan-modal.component.html',
	styleUrls: 		['./scan-modal.component.scss'],
})
export class QrCodeScanModal implements OnInit {
	


	@ViewChild('scanner', {static: true})
	public scanner: ZXingScannerComponent

	public hasPermission: 		boolean


	public availableDevices: 	MediaDeviceInfo[]	= []
	public currentDevice: 		FormControl			= new FormControl(null)
	public cameraNotFound:		boolean				= false
	public initializing:		boolean				= true
	public scannerEnabled:		boolean				= false

	constructor(
		private rccModalController 	: RccModalController,
		private rccToastController 	: RccToastController,
		private	cd					: ChangeDetectorRef
	) { }

	public dismiss(result?:any){
		this.rccModalController.dismiss(result)
	}

	
	ngOnInit(){


		this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {			
			this.availableDevices 	= 	devices		

			const defaultDevice 	=	this.availableDevices
										.find(({ label }) => /back|trás|rear|traseira|environment|ambiente/gi.test(label))
										||
										this.availableDevices[0]
			
			this.currentDevice.setValue(defaultDevice)		
			this.initializing 	= false
			this.scannerEnabled	= true


		})	

		this.scanner.camerasNotFound
		.subscribe( () => {
			this.availableDevices 	= []
			this.cameraNotFound 	= true
			this.initializing		= false
		})


		this.scanner.permissionResponse
		.subscribe( (perm: boolean)	=> {
			if(perm == null) this.initializing	= false
			this.hasPermission	= perm

		})

		this.scanner.scanSuccess.subscribe( (result:any) => {
			this.rccToastController.success("QR_CODE_SCANNER.SCAN.SUCCESS")
			this.rccModalController.dismiss(result)
		})
		
	}


}
