import 	{	Component 			}	from '@angular/core'
import	{	MenuController		}	from '@ionic/angular'
import	{	NotificationService }	from '../notifications'
import	{	QrCodeService		}	from '../qr-code'


@Component({
	selector: 		'rcc-home',
	templateUrl: 	'home.page.html',
	styleUrls: 		['home.page.scss'],
})
export class HomePage {

	constructor(
		public menuController		: MenuController,
		public notificationService	: NotificationService,
		public qrCodeService		: QrCodeService
	) {}


	public toggleMenu(){
		this.menuController.toggle()
	}
}
