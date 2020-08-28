export interface ItemConfig {

}


export abstract class Item<C> {

	public id?			: string
	protected _config?	: C


	static acceptsAsConfig(x: any): boolean {
		return false
	}

	constructor(config: C) {
		if(!(this.constructor as any).acceptsAsConfig(config)) throw new Error("Invalid "+this.constructor.name+" config.")
		this.config = config
	}

	public get config(): C { 
		return this._config
	}

	public set config(config: C){ 
		this._config = config
	}

	public match(query:any): boolean {
		const regex = new RegExp(String(query), 'gi')		
		return !!JSON.stringify(this.config || {}).match(regex)		
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


