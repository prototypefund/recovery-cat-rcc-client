import 	{ 	NgModule 	} 			from '@angular/core'
import	{	BrowserModule } 		from '@angular/platform-browser'
import	{	RouteReuseStrategy }	from '@angular/router'
import 	{ 	HttpClientModule } 		from '@angular/common/http'
import 	{	
			IonicModule, 
			IonicRouteStrategy 
		}							from '@ionic/angular'
import	{	SplashScreen } 			from '@ionic-native/splash-screen/ngx'
import 	{	StatusBar } 			from '@ionic-native/status-bar/ngx'

import 	{	AppComponent } 			from './app.component'
import	{	
			AppRoutingModule,
			TranslocoRootModule, 

			HomePageModule, 
			MainMenuModule,
		}							from './core'

import	{	
			QuestionaireModule,
			StaticQuestionStore,
			LocalStorageModule 
		}							from './features'

@NgModule({
	declarations: 		[ AppComponent ],
	entryComponents: 	[ ],
	imports: 			[
							BrowserModule, 
							IonicModule.forRoot(), 
							AppRoutingModule,
							HttpClientModule,
							TranslocoRootModule,
							MainMenuModule.forRoot({menuId: "rcc-main-menu", contentId: "rcc-main-content"}),

							// All modules from here on should be removable
							LocalStorageModule,
							HomePageModule,
							QuestionaireModule.forRoot([
								StaticQuestionStore
							])
						],
	providers: 			[
							StatusBar,
							SplashScreen,
							{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
						],
	bootstrap: 			[ AppComponent ]
})
export class AppModule {}



//TODO: Abstract component outlet or something like thta.. homepage works like main menu works like..
//TODO: Abstract translate