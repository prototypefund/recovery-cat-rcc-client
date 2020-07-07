export interface ItemConfig {

}


export abstract class Item<C> {

	public id?		: string
	public _config?	: C

	public get config(): C { 
		return this._config
	}

	public set config(config: C){ 
		this._config = config
	}

	constructor(config: C) {
		this.config = config
	}

	public match(query:any): boolean {
		return true
	}
}


export interface ItemStorage<C extends ItemConfig, I extends Item<C>> {
	getAll			: () 				=> Promise<C[]>
	store?			: (items: (I|C)[])	=> Promise<any>
	
}


export interface ItemStoreConfig<I extends Item<C>, C> {
	itemClass		: new (config: C) => I,
	storage			: ItemStorage<C,I>,
	identifyItemBy?	: string | ( (item: Item<C>) => string),
}


