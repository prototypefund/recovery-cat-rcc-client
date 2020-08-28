import 	{ 	
			NgModule, 
			Component,
			ModuleWithProviders,
		} 									from '@angular/core'

import	{	SharedModule 				}	from '../shared.module'
import	{	TranslationsModule			}	from '../translations'
import	{	StoreItemComponent			}	from './store-item/store-item.component'


import	{
			MetaStoreConfig,
			META_STORE_CONFIGS,
			ItemAction,
		}									from './meta-store.commons'

import	{	MetaStoreService			}	from './meta-store.service'
import	{	MetaStoreModal				}	from './modal/meta-store.modal'
import	{	MetaStoreComponent			}	from './content/meta-store.component'
import	{	
			HeaderComponent,
			PopoverComponent				
		}									from './header/header.component'

import en from './i18n/en.json'
import de from './i18n/de.json'


@NgModule({
	declarations: [
		StoreItemComponent,
		MetaStoreComponent,
		MetaStoreModal,
		HeaderComponent,
		PopoverComponent
	],

	imports: [
		SharedModule,
		TranslationsModule.forChild("META_STORE", {en, de})
	],

	exports: [
		StoreItemComponent,
		MetaStoreComponent,
		MetaStoreModal,
		HeaderComponent
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
