import	{ 
			Component, 
			OnInit,
			OnDestroy,
			InjectionToken,
			Inject,
			Optional,
			Type 
		}								from '@angular/core'

import	{	
			Router,
			NavigationStart 
		} 								from '@angular/router'

import	{	MenuController } 			from '@ionic/angular'

import	{	Subscription }				from 'rxjs'

import	{	filter }					from 'rxjs/operators'

import	{	
			MainMenuEntries,
			MAIN_MENU_CONFIG
		}								from './main-menu.commons'


@Component({
	selector: 		'rcc-main-menu',
	templateUrl: 	'./main-menu.component.html',
	styleUrls: 		['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit, OnDestroy {


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
							.sort( (entry1, entry2) => {
								const pos1 = (entry1 as any).position
								const pos2 = (entry2 as any).position

								if(!pos1) 	return 1
								if(!pos2)	return -1

								return 	pos1 > pos2
										?	-1
										:	+1
							})
							.map( entry => (entry as any).component || entry)
	}

	ngOnInit() {
	}

	ngOnDestroy(){
	}

}
