import	{ 	NgModule			}		from '@angular/core'
import 	{ 	CommonModule 		}		from '@angular/common'
import 	{ 	IonicModule 		}		from '@ionic/angular'
import	{	TranslationModule	}		from './translation/translation.module'



@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		TranslationModule
	],
	exports: [	
		CommonModule,
		IonicModule,
		TranslationModule
	],
	providers: [
		
	]
})
export class SharedModule {}
