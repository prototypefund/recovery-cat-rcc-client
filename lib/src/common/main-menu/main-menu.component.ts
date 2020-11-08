import	{ 
			Component, 
			InjectionToken,
			Inject,
			Optional,
			Type
		}								from '@angular/core'

import	{	
			Router,
			NavigationStart 
		} 								from '@angular/router'
import	{	MenuController 			} 	from '@ionic/angular'
import	{	sortByKeyFn 			}	from '@rcc/core'

import	{	Subscription 			}	from 'rxjs'

import	{	filter 					}	from 'rxjs/operators'

import	{	
			MainMenuEntries,
			MAIN_MENU_CONFIG
		}								from './main-menu.commons'


@Component({
	selector: 		'rcc-main-menu',
	templateUrl: 	'./main-menu.component.html',
	styleUrls: 		['./main-menu.component.scss'],
})
export class MainMenuComponent {


	public components: Type<any>[]


	constructor(
		@Optional() 
		public 		entries					: MainMenuEntries,
		@Optional() @Inject(MAIN_MENU_CONFIG)
		public		config					: any,
		protected	router					: Router,
		protected	menuController			: MenuController
	){

		this.components	 = 	entries
							.sort( sortByKeyFn('position') )
							.map( entry => (entry as any).component || entry)

	}

}
