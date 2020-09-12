import	{
			ItemConfig,
			Item
		}							from './item.class'

import	{
			Subject,
			merge
		}							from 'rxjs'




export interface ItemStorage<C extends ItemConfig, I extends Item<C>> {
	getAll			: () 				=> Promise<C[]>
	store?			: (items: (I|C)[])	=> Promise<any>
	
}


export interface ItemStoreConfig<I extends Item<C>, C> {
	itemClass		: new (config: C) => I,
	storage			: ItemStorage<C,I>,
	identifyItemBy?	: string | ( (item: Item<C>) => string),
}






export abstract class ItemStore<C extends ItemConfig, I extends Item<C>>{

	protected	itemClass		: new (config:C) => I
	protected	map				: Map<string,I>				= new Map()	
	protected	storage			: ItemStorage<C,I>

	protected	identifyItem	: (item: I) => string

	public		ready			: Promise<any>


	private		itemAddition$	= new Subject<I>()
	private		itemRemoval$	= new Subject<I>()
	private		itemUpdate$		= new Subject<I>()
	private		itemChange$		= merge(this.itemAddition$, this.itemRemoval$, this.itemUpdate$)




	constructor( config: ItemStoreConfig<I,C> ) {

		this.ready = this.init(config)		

	}

	protected async init(config: ItemStoreConfig<I,C>): Promise<void> {

		this.itemClass 			= config.itemClass
		this.storage			= config.storage

		this.identifyItem		= this.getIdentifyItemFn(config.identifyItemBy)

		await this.restoreFromStorage()
		
	}


	protected getIdentifyItemFn(identifyItemBy: any): (item:I) => string {
		if(!identifyItemBy) 						return (item:I) => item.id
		if(typeof identifyItemBy == 'string')		return (item:I) => (item as any)[identifyItemBy]
		if(typeof identifyItemBy == 'function') 	return identifyItemBy.bind(this)

		throw "ItemSource.getIdentifyItemFn: invalid identifyItemConfig"	
	}



	protected async restoreFromStorage(): Promise<any>{
		const configs = await this.storage.getAll()

		configs.forEach( (config:C) => this.addConfig(config))
	}



	protected addConfig( config: C): I {
		const item  = new this.itemClass(config)

		this.addItem(item)

		return item
	}


	protected addItem(item: I): I {

		const id = this.identifyItem(item)
	
		this.map.set(id, item)

		this.itemAddition$.next(item)

		return item
	}


	protected  removeItem(item: I): any {
		const id = this.identifyItem(item)
		if(!this.map.delete(id)) throw "item not found"

		this.itemRemoval$.next(item)

		return item
	}







	protected async storeAll(): Promise<any> {
		if(!this.storage.store) throw "ItemStore.storage.store() not implemented: "+ (typeof this)

		return this.storage.store(Array.from(this.map.values()))
	}


	public async get(id: 		string)		: Promise<I> 
	public async get(ids: 		string[])	: Promise<I[]> 
	public async get(id_or_ids: string | string[]): Promise<I|I[]> {

		await this.ready

		if(typeof id_or_ids == 'string') return await this.get([id_or_ids]).then( (items:I[]) => items[0] )

		const ready_items = id_or_ids.map(id => this.map.get(id))
		
		return ready_items
	}


	public get items(){
		return Array.from(this.map.values())
	}

}