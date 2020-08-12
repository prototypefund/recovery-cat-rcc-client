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
			TranslationsModule, 

			HomePageModule, 
			MainMenuModule,
		}									from '@rcc/common'

import	{	
			LocalStorageModule,
			CustomQuestionsModule,
			FallbackQueryWidgetsModule,
			QueriesModule,
			CustomSymptomCheckStoreModule,
			SymptomCheckViewModule,
			SymptomCheckShareModule,
			QrCodeScannerModule,
			ReportImportStoreModule,
			WebsocketTransmissionModule,
			DueQuestionsModule
		}									from '@rcc/features'

import	{
			IonicModalsModule,
			IonicIconsModule,
		}									from '@rcc/ionic'

import	{

			StaticQuestionStoreModule,
			StaticSymptomCheckStoreModule,
		}									from '@rcc/mock'



@NgModule({
	declarations: 		[ AppComponent ],
	entryComponents: 	[ ],
	imports: 			[
							BrowserModule, 
							IonicModule.forRoot(), 
							HttpClientModule,
							TranslationsModule,
							MainMenuModule.forRoot({menuId: "rcc-main-menu", contentId: "rcc-main-content"}),

							//how to handle these modules?
							IonicModalsModule,
							IonicIconsModule,

							// All following modules should be removable without causing any errors
							HomePageModule,
							LocalStorageModule,
							StaticQuestionStoreModule,
							CustomQuestionsModule,
							FallbackQueryWidgetsModule,
							StaticSymptomCheckStoreModule,
							CustomSymptomCheckStoreModule,
							SymptomCheckViewModule,
							SymptomCheckShareModule,
							QrCodeScannerModule,
							ReportImportStoreModule,
							WebsocketTransmissionModule.forRoot("wss://signal.recoverycat.de"),
							DueQuestionsModule,
							///
							AppRoutingModule,
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

//TODO: Abstract Icon Map
//TODO: Abstract Header

//TODO: Check bounds validation