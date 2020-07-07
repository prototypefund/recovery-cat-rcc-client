import	{	Type				}	from '@angular/core'

import	{	Item,
			ItemConfig,
			ItemStore,			
		}							from '@rcc/core'

import	{	
			ItemAction,
			StoreAction	
		}							from './meta-store.commons'


export abstract	class MetaStore
				<
					C extends ItemConfig, 
					I extends Item<C>, 
					S extends ItemStore<C,I>
				> {

		public stores			: S[] 					
		public itemActions		: ItemAction<I>[] 	
		public storeActions		: StoreAction<S>[]	

	constructor(		
		stores			: S[]				= [],
		itemActions		: ItemAction<I>[]	= [],
		storeActions	: StoreAction<S>[]	= []	
	) {

		this.stores 		= stores 		|| []
		this.itemActions 	= itemActions 	|| []
		this.storeActions	= storeActions 	|| []

	}


	public handleIdWithoutItem(id: string): I | null {
		return null
	}

	public async get (id: string): Promise<I>
	public async get (ids: string[]): Promise<I[]>
	public async get (id_or_ids: string| string []): Promise<I[]|I>{

		if(typeof id_or_ids == 'string') return await this.get([id_or_ids]).then( items => items[0])

		const 	getPromises	= this.stores.map( store => store.get(id_or_ids) ) //TODO: deal with doubles?
		const 	itemArrays 	= await Promise.all(getPromises)  //TODO: deal with undefined!

		

		return	id_or_ids.map( (id: string, index: number) => {
			
					return 	itemArrays.reduce( (result:I, itemArray)  => {
								return result || itemArray[index]
							}, undefined)
							||
							this.handleIdWithoutItem(id)
				})
				.filter( (item: I) => !!item )
		

	}

	public getStore(item: I) : S {
		return 	this.stores.find( (store: S) =>  store.items.includes(item) )
	}

}
