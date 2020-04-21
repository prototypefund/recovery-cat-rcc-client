import	{	
			NgModule,
			Component, 
			ModuleWithProviders,
			InjectionToken,
			Injectable,
			Injector,
			Type,
			APP_BOOTSTRAP_LISTENER,
			APP_INITIALIZER,
			ApplicationRef,
			ComponentFactoryResolver ,
			ComponentFactory,
			ComponentRef,
			EmbeddedViewRef
		} 								from '@angular/core'

import	{	CommonModule } 				from '@angular/common'

import 	{	
			IonicModule, 
		}								from '@ionic/angular'

import	{	MainMenuComponent }			from './main-menu.component'

import	{	
			MainMenuComponents,
			MainMenuConfig,
			MAIN_MENU_COMPONENT
		}								from './main-menu.commons'





export function provideComponents(components: Type<any>[]){

	return	components.map( component => ({ 
				provide: 	MainMenuComponents,  
				multi:		true,
				useValue:	component
			}))
			

}


@Injectable()
export class MainMenuInitializer{

	initialized : boolean = false

	constructor(
		private injector: Injector
	){}


	bootstrapListener(componentRef: ComponentRef<any>): void {

		const mainMenuConfig			=	this.injector.get(MainMenuConfig)

		// dont insert anything if the user wants to do it manually:
		if(mainMenuConfig.manual)	return null

		// dont do this multiple times:
		if(this.initialized) 		return null

		const applicationRef 			= 	this.injector.get(ApplicationRef)

		//Ignore everything but the app component:
		if(componentRef != applicationRef.components[0]) return null

		const appElement				= 	componentRef.location.nativeElement
		const contentElement 			= 	appElement.querySelector("ion-app")

		contentElement.id 
		?	mainMenuConfig.contentId 	= 	contentElement.id
		:	contentElement.id			= 	mainMenuConfig.contentId 


		//create menu component and respective element:
		const componentFactoryResolver 	= 	this.injector.get(ComponentFactoryResolver)
		const mainMenuComponent			= 	this.injector.get(MAIN_MENU_COMPONENT)
		const mainMenuComponentRef		= 	componentFactoryResolver
											.resolveComponentFactory(mainMenuComponent)
											.create(this.injector)	
		const mainMenuElement			=	mainMenuComponentRef.location.nativeElement


		//entangle with angular change detection:
		applicationRef.attachView(mainMenuComponentRef.hostView)


		//manipulate DOM
		contentElement.appendChild(mainMenuElement)

		//todo cleanup?		

		this.initialized = true

	}

}



export function getBootstrapListener(r: MainMenuInitializer) {
	return r.bootstrapListener.bind(r)
}




@NgModule({
	declarations: 		[
							MainMenuComponent
						],

	imports: 			[
							IonicModule,
							CommonModule,
						],
	
	exports:			[
							MainMenuComponent
						],
	providers:			[
							{ provide: MainMenuConfig, useValue: { menuId: 'rcc-main-menu', contentId: 'rcc-main-menu-content', manual: false } },
							{ provide: MainMenuInitializer },
							{ provide: APP_BOOTSTRAP_LISTENER, multi:true, useFactory: getBootstrapListener, deps :[MainMenuInitializer] },
							{ provide: MAIN_MENU_COMPONENT, useValue: MainMenuComponent}
						]

})
export class MainMenuModule {


	static forRoot(components: Type<any>[] = [], config: MainMenuConfig): ModuleWithProviders<MainMenuModule> {

		return	{
			ngModule: 	MainMenuModule,
			providers:	[
							provideComponents(components),
							{ provide: MainMenuConfig, 		useValue:	config },

						]
		}

	}

	static forChild(components: Type<any>[] = [] ): ModuleWithProviders<MainMenuModule> {

		return	{
			ngModule: 	MainMenuModule,
			providers:	[
							provideComponents(components),
						]
		}
	}

}
