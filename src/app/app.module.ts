import 	{ 	NgModule 	} 			from '@angular/core'
import	{	BrowserModule } 		from '@angular/platform-browser'
import	{	RouteReuseStrategy }	from '@angular/router'
import 	{ 	HttpClientModule } 		from '@angular/common/http';
import 	{	
			IonicModule, 
			IonicRouteStrategy 
		}							from '@ionic/angular'
import	{	SplashScreen } 			from '@ionic-native/splash-screen/ngx'
import 	{	StatusBar } 			from '@ionic-native/status-bar/ngx'

import 	{ 	TranslocoRootModule } 	from './transloco-root.module'

import 	{	AppComponent } 			from './app.component'
import	{	AppRoutingModule }		from './app-routing.module'
import	{	HomePageModule }		from './home/home.module'
import	{	MainMenuModule }		from './main-menu/main-menu.module'
import	{	QuestionaireModule }	from './questionaire/questionaire.module'


@NgModule({
	declarations: 		[ AppComponent ],
	entryComponents: 	[ ],
	imports: 			[
							BrowserModule, 
							IonicModule.forRoot(), 
							AppRoutingModule,
							HttpClientModule,
							TranslocoRootModule,

							// All modules from here on should be removable
							HomePageModule,
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