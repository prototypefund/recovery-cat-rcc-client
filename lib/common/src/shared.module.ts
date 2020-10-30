import	{ 	NgModule				}		from '@angular/core'
import 	{ 	CommonModule 			}		from '@angular/common'
import	{	ReactiveFormsModule		}		from '@angular/forms'
import 	{ 	IonicModule 			}		from '@ionic/angular'
import	{	TranslationsModule		}		from './translations'
import	{	IconsModule				}		from './icons'
import	{	MainHeaderModule		}		from './main-header'
import	{	SettingsModule			}		from './settings'

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		TranslationsModule,
		IconsModule,
		ReactiveFormsModule,
		MainHeaderModule,
		IconsModule,
		SettingsModule
	],
	exports: [	
		CommonModule,
		IonicModule,
		TranslationsModule,
		IconsModule,
		ReactiveFormsModule,
		MainHeaderModule,
		IconsModule,
		SettingsModule
	],
	providers: [
		
	]
})
export class SharedModule {}
