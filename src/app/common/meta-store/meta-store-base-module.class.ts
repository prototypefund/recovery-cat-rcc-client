import	{	Type				}	from '@angular/core'
import	{	ItemStore			}	from '@rcc/core'
import	{	ItemAction			}	from '@rcc/common'

export class BaseMetaStoreModule {

	static getModuleWithProviders(
		module		: Type<BaseMetaStoreModule>, 
		stores		: Type<ItemStore<any,any>>[],
		actions		: ItemAction<any>[],
		storeToken	: any, 
		actionToken	: any
	){

		return 	{
					ngModule:	module,
					providers:	[
									...(stores||[])	.map( 	storeClass	=> ({provide: storeToken,	useExisting: 	storeClass, 	multi:true })),
									...(actions||[]).map( 	action 		=> ({provide: actionToken,	useValue: 		action, 		multi:true })),

								]
				}
	}	

}
