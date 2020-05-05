export interface ItemConfig {

}


export abstract class Item {

	public id?		: string

	abstract get config(): any

}


export interface ItemStorage<C extends ItemConfig> {
	getAll		: () 				=> Promise<Set<C>|Array<C>>
	storeAll?	: (configs: C[])	=> Promise<any>
}


export interface ItemStoreConfig<I extends Item, C> {
	itemClass		: new (config: C) => I,
	storage			: ItemStorage<C>,
	identifyItemBy?	: string | ( (item: Item) => string),
}


export interface ItemStore<I extends Item, C extends ItemConfig>{	
	delete?(item:I):Promise<any>
}


export abstract class ItemStore<I extends Item, C extends ItemConfig>{

	protected	itemClass		: new (config:C) => I
	protected	dictionary		: { [index: string]: I }	= {}	
	protected	storage			: ItemStorage<C>
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

		this.identifyItem		= this.getIdentifyItemFn(config.identifyItemBy)

		return this.restoreFromStorage()
	}


	protected getIdentifyItemFn(identifyItemBy: any): (item:I) => string {
		if(!identifyItemBy) 						return (item:I) => item.id
		if(typeof identifyItemBy == 'string')		return (item:I) => (item as any)[identifyItemBy]
		if(typeof identifyItemBy == 'function') 	return identifyItemBy

		throw "ItemSource.getIdentifyItemFn: invalid identifyItemConfig"	
	}

	protected add( config: C){
		const item  = new this.itemClass(config)
		const id	= this.identifyItem(item)

		this.dictionary[id] = item
	}


	protected async restoreFromStorage(): Promise<any>{
		const configs = await this.storage.getAll()

		configs.forEach( (config:C) => this.add(config))
	}

	public async lookUp(ids: string[]): Promise<I[]> {
		await this.ready
		const ready_items = ids.map(id => this.dictionary[id])
		//TODO remote see POC
		return ready_items
	}

	public get items(){
		return Object.values(this.dictionary)
	}

}