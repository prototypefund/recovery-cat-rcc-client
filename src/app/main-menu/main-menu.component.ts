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
			MAIN_MENU_COMPONENTS,
			MAIN_MENU_CONFIG,
			MainMenuConfig,
			MainMenuConfigClass
		}								from './main-menu.commons'


@Component({
	selector: 		'rcc-main-menu',
	templateUrl: 	'./main-menu.component.html',
	styleUrls: 		['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit, OnDestroy {


	private subscription	: Subscription

	constructor(
		@Optional() @Inject(MAIN_MENU_COMPONENTS) 
		public 	components		: Component[],
		@Optional() @Inject(MainMenuConfigClass) 
		public	config			: MainMenuConfig,
		private router			: Router,
		private menuController	: MenuController
	){

		this.subscription =	router.events
							.pipe(
								filter(	event 	=> event instanceof NavigationStart)
							)
							.subscribe( event 	=> this.menuController.close() )
	}

	ngOnInit() {}

	ngOnDestroy(){
		this.subscription.unsubscribe()
	}

}
