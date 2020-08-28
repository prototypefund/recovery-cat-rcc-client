import	{	Type				}	from '@angular/core'

import	{	Item,
			ItemConfig,
			ItemStore,			
		}							from '@rcc/core'

import	{	
			ItemAction,
			MetaAction	
		}							from './meta-store.commons'


export abstract	class MetaStore
				<
					C extends ItemConfig, 
					I extends Item<C>, 
					S extends ItemStore<C,I>
				> {

	public name : string 

	constructor(		
		public stores			: S[]				= [],
		public itemActions		: ItemAction<I>[]	= [],
		public metaActions		: MetaAction<I>[]	= []	
	) {

		this.stores 		= stores 		|| []
		this.itemActions 	= itemActions	|| []
		this.metaActions	= metaActions	|| []
	}

	get items(){
		console.log(this.stores)
		return this.stores.map( store => store.items).flat()
	}


	public handleIdWithoutItem(id: string): I | null {
		return null
	}

	public async get (id: string): Promise<I>
	public async get (ids: string[]): Promise<I[]>
	public async get (id_or_ids: string| string []): Promise<I[]|I>{

		if(typeof id_or_ids == 'string') return await this.get([id_or_ids]).then( items => items[0])

		const 	getPromises	= 	this.stores.map( store => store.get(id_or_ids) ) //TODO: deal with doubles?
		const 	itemArrays 	= 	await Promise.all(getPromises)  //TODO: deal with undefined!

		const	result 		= 	id_or_ids.map( (id: string, index: number) => {
			
									return 	itemArrays.reduce( (result:I, itemArray)  => {
												return result || itemArray[index]
											}, undefined)
											||
											this.handleIdWithoutItem(id)
								})
								.filter( (item: I) => !!item )
		
		if(result.length == 0) throw "no matching items found"

		return result
		
	}

	public getStore(item: I) : S {
		return 	this.stores.find( (store: S) =>  store.items.includes(item) )
	}


	async filter( callback: (item :I) => boolean ) : Promise<I[]> {
		await this.stores.map( store => store.ready)

		return 	this.stores
				.map( store => store.items.filter(callback) )
				.flat()

	}

}
