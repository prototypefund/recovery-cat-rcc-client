import	{ 	NgModule				}		from '@angular/core'
import 	{ 	CommonModule 			}		from '@angular/common'
import 	{ 	IonicModule 			}		from '@ionic/angular'
import	{	TranslationsModule		}		from '@rcc/common/translations'
import	{	IconsModule				}		from '@rcc/common/icons'
import	{	ReactiveFormsModule		}		from '@angular/forms'

@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		TranslationsModule,
		IconsModule,
		ReactiveFormsModule,
	],
	exports: [	
		CommonModule,
		IonicModule,
		TranslationsModule,
		IconsModule,
		ReactiveFormsModule,
	],
	providers: [
		
	]
})
export class SharedModule {}
