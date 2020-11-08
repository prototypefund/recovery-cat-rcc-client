import 	{	Component,
			Optional,
			Type
		}								from '@angular/core'
import	{	MenuController			}	from '@ionic/angular'
import	{	sortByKeyFn 			}	from '@rcc/core'
import	{	
			HomePageEntries,
			HomePageEntryConfig

		}								from './home.entries'
import	{	NotificationService 	}	from '../notifications'


@Component({
	selector: 		'rcc-home',
	templateUrl: 	'home.page.html',
	styleUrls: 		['home.page.scss'],
})
export class HomePageComponent {

	public entries: HomePageEntries

	constructor(
		@Optional() 
		entries						: HomePageEntries,
		public menuController		: MenuController,
		public notificationService	: NotificationService,
	) {
		this.entries = (entries || []).sort( sortByKeyFn('position') )
	}


	public toggleMenu(){
		this.menuController.toggle()

	}
}


