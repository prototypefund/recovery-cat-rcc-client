import 	{	NgModule 				} 	from '@angular/core'
import	{	
			DevModule,				
			StorageProviderModule,
			RccStorage	
		}								from '@rcc/common'

import	{	LocalStorageService		}	from './local-storage.service'

@NgModule({
	imports: [
		StorageProviderModule.forRoot(LocalStorageService),
		DevModule.note('LocalStorageModule')
	],
})
export class LocalStorageModule{}
