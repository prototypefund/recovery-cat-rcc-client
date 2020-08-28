import 	{ 	Component				}	from '@angular/core'
import	{	MainHeaderItemComponent }	from '@rcc/common/main-header'
import	{	NotificationService		}	from '@rcc/common/notifications'


@Component({
	templateUrl: 	'./header-item.component.html',	
	styleUrls: 		['./header-item.component.scss'],
})
export class MainMenuHeaderItemComponent extends MainHeaderItemComponent {

	constructor(
		public notificationService: NotificationService
	){
		super()
	}

}



