import 	{ 	NgModule 					} 	from '@angular/core'
import	{	BrowserModule 				} 	from '@angular/platform-browser'
import	{	RouteReuseStrategy 			}	from '@angular/router'
import 	{ 	HttpClientModule 			} 	from '@angular/common/http'
import 	{	
			IonicModule, 
			IonicRouteStrategy 
		}									from '@ionic/angular'
import	{	SplashScreen 				} 	from '@ionic-native/splash-screen/ngx'
import 	{	StatusBar 					} 	from '@ionic-native/status-bar/ngx'

import 	{	AppComponent 				} 	from './app.component'
import	{	
			AppRoutingModule,
			TranslationModule, 

			HomePageModule, 
			MainMenuModule,
		}									from '@rcc/common'

import	{	
			StaticQuestionStoreModule,
			LocalStorageModule,
			CustomQuestionsModule,
			FallbackQueryWidgetsModule 
		}									from '@rcc/features'



@NgModule({
	declarations: 		[ AppComponent ],
	entryComponents: 	[ ],
	imports: 			[
							BrowserModule, 
							IonicModule.forRoot(), 
							AppRoutingModule,
							HttpClientModule,
							TranslationModule,
							MainMenuModule.forRoot({menuId: "rcc-main-menu", contentId: "rcc-main-content"}),

							// All modules from here on should be removable
							HomePageModule,
							LocalStorageModule,
							StaticQuestionStoreModule,
							CustomQuestionsModule,
							FallbackQueryWidgetsModule,
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