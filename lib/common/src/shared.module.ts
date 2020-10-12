import	{ 	NgModule				}		from '@angular/core'
import 	{ 	CommonModule 			}		from '@angular/common'
import	{	ReactiveFormsModule		}		from '@angular/forms'
import 	{ 	IonicModule 			}		from '@ionic/angular'
import	{	TranslationsModule		}		from '@rcc/common/translations'
import	{	IconsModule				}		from '@rcc/common/icons'
import	{	MainHeaderModule		}		from '@rcc/common/main-header'
import	{	SettingsModule			}		from '@rcc/common/settings'

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
