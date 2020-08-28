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

export type ActionRole = undefined | "details" | "destructive" | "productive"


export interface ItemAction<I extends Item<any>> {
	label			: string,
	role?			: ActionRole
	icon?			: string,
	path?			: string,			//use ":id" for item id
	position?		: number,
	store?			: Type<ItemStore<any, I>>,
	deps?			: any, 
	handlerFactory?	: (...dependencies: any[]) => (item: I, store? :ItemStore<any,I>) => any,
	handler?		: (item: I, store? :ItemStore<any,I>) => any, 
	successMessage?	: string,
	failureMessage?	: string

}

export interface MetaAction<I extends Item<any>>{
	label			: string,
	role?			: ActionRole
	icon?			: string,
	path?			: string,			
	position?		: number,
	store?			: Type<ItemStore<any, I>>,
	deps?			: any, 
	handlerFactory?	: (...dependencies: any[]) => () => any,
	handler?		: () => any, 
	successMessage?	: string,
	failureMessage?	: string
}


export interface MetaStoreConfig<C extends ItemConfig, I extends Item<C> ,S extends ItemStore<C,I> > {
	itemClass			: Type<I>,
	itemLabelComponent?	: Type<any>,
	itemIcon?			: string,	
	serviceClass		: Type<MetaStore<C,I,S>>,
}


export const META_STORE_CONFIGS = new InjectionToken<MetaStoreConfig<any,any,any> >('Meta Store Module Configs')
