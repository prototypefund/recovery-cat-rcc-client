import 	{ 	
			NgModule, 
			Component,
			ModuleWithProviders,
		} 									from '@angular/core'

import	{	SharedModule 				}	from '../shared.module'


import	{	StoreItemComponent			}	from './store-item/store-item.component'


import	{
			MetaStoreConfig,
			META_STORE_CONFIGS,
			ItemAction,
		}									from './meta-store.commons'

import	{
			MetaStoreComponent
		}									from './meta-store.component/meta-store.component'

import	{
			MetaStoreService
		}									from './meta-store.service'

import	{
			MetaStoreModal
		}									from './meta-store.modal/meta-store.modal'


@NgModule({
	declarations: [
		StoreItemComponent,
		MetaStoreComponent,
		MetaStoreModal,
	],

	imports: [
		SharedModule
	],

	exports: [
		StoreItemComponent,
		MetaStoreComponent,
		MetaStoreModal,
	],
	providers:[
		MetaStoreService
	]
})
export class MetaStoreModule {

	static 	forChild(config: MetaStoreConfig<any, any, any>): ModuleWithProviders<MetaStoreModule> {


		return 	{
					ngModule:	MetaStoreModule,
					providers:	[
									{provide: META_STORE_CONFIGS,	useValue: config, 	multi:true },
								]
				}
	}
}
