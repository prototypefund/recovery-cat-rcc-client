import 	{
			Type,
			InjectionToken,
			ModuleWithProviders
		}							from '@angular/core'

import	{	
			ItemConfig,
			Item, 
			ItemStore		
		}							from '@rcc/core'

import	{	MetaStore			}	from './meta-store.class'

export class AbstractMetaStoreModule {
	static forChild: () => ModuleWithProviders
}

export interface ItemAction<I extends Item<any>> {
	label			: string,
	icon?			: string,
	path?			: string,
	store?			: Type<ItemStore<any, I>>,
	handler?		: (item: I, store? :ItemStore<any,I>) => any,
	successMessage?	: string,
	failureMessage?	: string

}

export interface StoreAction<S extends ItemStore<any,any>>{
	label		: string,
	icon?		: string,
	path?		: string,
	handler?	: () => any 		
}


export interface MetaStoreConfig<C extends ItemConfig, I extends Item<C> ,S extends ItemStore<C,I> > {
	itemClass			: Type<I>,
	itemLabelComponent?	: Type<any>,
	itemIcon?			: string,	
	serviceClass		: Type<MetaStore<C,I,S>>,
}


export const META_STORE_CONFIGS = new InjectionToken<MetaStoreConfig<any,any,any> >('Meta Store Module Configs')
