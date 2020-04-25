import 	{	NgModule 				} 	from '@angular/core'
import	{	
			DevModule,				
			StorageProviderModule	
		}								from 'app/core'

@NgModule({
	imports: [
		StorageProviderModule,
		DevModule.note('LocalStorageModule')
	]
})
export class LocalStorageModule{}
