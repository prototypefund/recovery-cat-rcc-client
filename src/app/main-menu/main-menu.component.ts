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
			MainMenuComponents,
			MainMenuConfig
		}								from './main-menu.commons'


@Component({
	selector: 		'rcc-main-menu',
	templateUrl: 	'./main-menu.component.html',
	styleUrls: 		['./main-menu.component.scss'],
})
export class MainMenuComponent implements OnInit, OnDestroy {


	protected subscription		: Subscription

	constructor(
		@Optional() 
		public 		components		: MainMenuComponents,
		@Optional() 
		public		config			: MainMenuConfig,
		protected	router			: Router,
		protected	menuController	: MenuController
	){}

	ngOnInit() {

		this.subscription =	this.router.events
							.pipe(
								filter(	event 	=> event instanceof NavigationStart)
							)
							.subscribe( event 	=> this.menuController.close() )
	}

	ngOnDestroy(){
		this.subscription.unsubscribe()
	}

}
