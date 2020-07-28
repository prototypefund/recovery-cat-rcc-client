import	{	
			NgModule,
			ModuleWithProviders			
		} 									from '@angular/core'
import	{	IncomingData				}	from './incoming-data.service'
import	{	
			DataClaimConfig,
			DATA_IMPORT_CALLBACK	
		}									from './incoming-data.commons'




@NgModule({
	declarations: [],
	providers: [
		IncomingData
	]
})
export class IncomingDataModule {


	static forChild(claimConfig: DataClaimConfig) : ModuleWithProviders<IncomingDataModule> {

			return 	{
					ngModule: 	IncomingDataModule,
					providers: 	[
									{
										provide: 	DATA_IMPORT_CALLBACK,
										useValue:	claimConfig,
										multi: 		true
									}
								]
				}
	}
}
