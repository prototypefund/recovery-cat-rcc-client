import	{ 	NgModule			}		from '@angular/core'
import 	{ 	CommonModule 		}		from '@angular/common'
import 	{ 	IonicModule 		}		from '@ionic/angular'
import	{	TranslationModule	}		from './translation/translation.module'
import	{	ReactiveFormsModule	}		from '@angular/forms'


@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		TranslationModule,
		ReactiveFormsModule
	],
	exports: [	
		CommonModule,
		IonicModule,
		TranslationModule,
		ReactiveFormsModule
	],
	providers: [
		
	]
})
export class SharedModule {}
