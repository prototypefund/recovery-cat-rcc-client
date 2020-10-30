import	{	Type				}	from '@angular/core'
import	{	ItemStore			}	from '@rcc/core'
import	{	
			ItemAction,			
			MetaAction
		}							from '..'

export class BaseMetaStoreModule {

	static getModuleWithProviders(
		module		: Type<BaseMetaStoreModule>, 
		stores		: Type<ItemStore<any,any>>[],
		itemActions	: ItemAction<any>[],
		metaActions	: MetaAction<any>[],
		storeToken	: any, 
		actionToken	: any,
		metaToken	: any
	){

		return 	{
					ngModule:	module,
					providers:	[
									...(stores||[]).map( storeClass	=> ({provide: storeToken,	useExisting: 	storeClass, 	multi:true })),

									...(itemActions||[]).map( 	itemAction	=> ({
											provide: 	actionToken,	
											deps:		itemAction.deps || [],
											useFactory: (...args:any[]) =>({
															...itemAction,
															handler: itemAction.handler || itemAction.handlerFactory && itemAction.handlerFactory(...args)
														}),	
											multi:true 
									})),

									...(metaActions||[]).map( 	metaAction	=> ({
											provide:	metaToken,	
											deps:		metaAction.deps || [],
											useFactory: (...args:any[]) => ({
															...metaAction,
															handler: metaAction.handler || metaAction.handlerFactory && metaAction.handlerFactory(...args)
														}),											
											multi:true 
									})),

								]
				}
	}	

}
