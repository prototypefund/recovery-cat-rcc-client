import	{
			ItemConfig,
			Item,
			ItemStorage,
			ItemStoreConfig,
		}						from './items.commons'

export interface ItemStore<C extends ItemConfig, I extends Item<C>>{	
	delete?(item:I):Promise<any>
}

export abstract class ItemStore<C extends ItemConfig, I extends Item<C>>{

	protected	itemClass		: new (config:C) => I
	protected	map				: Map<string,I>				= new Map()	
	protected	storage			: ItemStorage<C,I>
	protected	identifyItem	: (item: I) => string
	protected	resolveReady	: (result: any) => void
	protected	rejectReady		: (reason: any) => void

	public		ready			: Promise<any>				= new Promise( (s,j) => { this.resolveReady = s; this.rejectReady = j })

	constructor( config: ItemStoreConfig<I,C> ){
		this.initialize(config)
		.then( 
			this.resolveReady,
			this.rejectReady
		)
	}

	protected async initialize(config: ItemStoreConfig<I,C>): Promise<void>{
		this.itemClass 			= config.itemClass
		this.storage			= config.storage

		this.identifyItem		= this.getIdentifyItemFn(config.identifyItemBy).bind(this)

		return this.restoreFromStorage()
	}


	protected getIdentifyItemFn(identifyItemBy: any): (item:I) => string {
		if(!identifyItemBy) 						return (item:I) => item.id
		if(typeof identifyItemBy == 'string')		return (item:I) => (item as any)[identifyItemBy]
		if(typeof identifyItemBy == 'function') 	return identifyItemBy

		throw "ItemSource.getIdentifyItemFn: invalid identifyItemConfig"	
	}


	protected addConfig( config: C):I {
		const item  = new this.itemClass(config)
		const id	= this.identifyItem(item)

		this.map.set(id,item)

		return item
	}


	protected addItem(item: I):I{
		const id	= this.identifyItem(item)
		this.map.set(id, item)

		return item
	}


	protected async restoreFromStorage(): Promise<any>{
		const configs = await this.storage.getAll()

		configs.forEach( (config:C) => this.addConfig(config))
	}

	protected async storeAll(): Promise<any> {
		if(!this.storage.store) throw "ItemStore.storage.store() not implemented: "+ (typeof this)

		return this.storage.store(Array.from(this.map.values()))
	}


	public async lookUp(ids: string[]): Promise<I[]> {
		await this.ready
		const ready_items = ids.map(id => this.map.get(id))
		//TODO remote see POC
		return ready_items
	}

	public get items(){
		return Array.from(this.map.values())
	}

}