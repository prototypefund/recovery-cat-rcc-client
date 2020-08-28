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
			CustomQuestionStoreModule,
			FallbackQueryWidgetsModule,
			BasicQueryWidgetsModule,
			QueriesModule,
			CustomSymptomCheckStoreModule,

			SymptomCheckViewModule,
			SymptomCheckShareModule,
			ImportSymptomCheckStoreModule,

			QrCodeScannerModule,
			ReportImportStoreModule,
			WebsocketTransmissionModule,
			DueQuestionsModule,
			ChartsModule,
			DemoScanModule
		}									from '@rcc/features'

import	{
			IonicModalsModule,
			IonicIconsModule,
		}									from '@rcc/ionic'

import	{

			StaticQuestionStoreModule,
			StaticSymptomCheckStoreModule,
			StaticEntryStoreModule
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
							BasicQueryWidgetsModule,
							CustomQuestionStoreModule,
							FallbackQueryWidgetsModule,
							CustomSymptomCheckStoreModule,
							ImportSymptomCheckStoreModule,
							SymptomCheckViewModule,
							SymptomCheckShareModule,
							QrCodeScannerModule,
							//ReportImportStoreModule,
							DueQuestionsModule,
							ChartsModule,
							WebsocketTransmissionModule.forRoot("wss://signal.recoverycat.de"),

							DemoScanModule,

							StaticQuestionStoreModule,
							StaticEntryStoreModule,
							StaticSymptomCheckStoreModule,
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