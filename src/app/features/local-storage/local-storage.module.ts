import 	{	NgModule 				} 	from '@angular/core'
import	{	
			DevModule,				
			StorageProviderModule,
			RccStorage	
		}								from '@rcc/common'

import	{	LocalStorageService		}	from './local-storage.service'

@NgModule({
	imports: [
		StorageProviderModule,
		DevModule.note('LocalStorageModule')
	],
	providers:[
		{ provide: RccStorage, useClass: LocalStorageService}
	]
})
export class LocalStorageModule{}
