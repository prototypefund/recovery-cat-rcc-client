import	{ 	NgModule			}		from '@angular/core'
import 	{ 	CommonModule 		}		from '@angular/common'
import 	{ 	IonicModule 		}		from '@ionic/angular'
import	{	TranslocoRootModule }		from './translation/transloco-root.module'



@NgModule({
	imports: [
		CommonModule,
		IonicModule,
		TranslocoRootModule
	],
	exports: [	
		CommonModule,
		IonicModule,
		TranslocoRootModule
	],
	providers: [
		
	]
})
export class SharedModule {}
