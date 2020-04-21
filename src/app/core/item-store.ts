export abstract class Item {

	id?					: string

	abstract get config(): any

}


export interface ItemStorage<I extends Item> {
	getAll	: () => Set<I>|Array<I>
}

export interface ItemStoreConfig<I extends Item> {
	itemClass		: () => I,
	storage			: ItemStorage<I>,
	sources			: ItemSource<I>[]
	identifyItemBy?	: string | ( (item: Item) => string),
}

export interface ItemSource<I extends Item> {
	get				: () => Promise<Set<I>>|Promise<Array<I>> //Iterable<Item> ??

}


export class ItemStore<I extends Item>{

	protected	itemClass		: () => I
	protected	items			: Set<I>	
	protected	sources			: Set<ItemSource<I>>
	protected	storage			: ItemStorage<I>
	protected	identifyItem	: (item:I) => string
	protected	resolveReady	: (result:any) => void
	protected	rejectReady		: (reason:any) => void

	public		ready			: Promise<any>		= new Promise( (s,j) => { this.resolveReady = s; this.rejectReady = j })

	constructor( config: ItemStoreConfig<I> ){
		this.initialize(config)
		.then( 
			this.resolveReady,
			this.rejectReady
		)
	}

	protected async initialize(config: ItemStoreConfig<I>): Promise<void>{
		this.sources 			= new Set( config.sources || [])
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

	protected async restoreFromStorage(): Promise<any>{
		this.storage.getAll()
	}

	public addSource(source: ItemSource<I>): void {
		this.sources.add(source)
	}

	public removeSource(source: ItemSource<I>): void {
		this.sources.delete(source)
	}



}