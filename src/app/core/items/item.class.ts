export interface ItemConfig {

}


export abstract class Item<C> {

	public id?			: string
	protected _config?	: C


	static acceptsAsConfig(x: any): boolean {
		return false
	}

	static findConfigs(data:any): any[] {		//sadly I cannot use C[] here
		if(this.acceptsAsConfig(data) )	return [data]
		if(data instanceof Array) 		return data.map( this.findConfigs.bind(this) ).flat()
			
		return[]	
	}




	constructor(config: C) {
		this.config = config
	}



	public get config(): C { 
		return this._config
	}

	public set config(config: C){ 

		const itemClass = this.constructor as any

		if(!itemClass.acceptsAsConfig(config)) throw new Error("Invalid "+this.constructor.name+" config.")

		this._config = config
	}



	public match(query:any): boolean {
		const regex = new RegExp(String(query), 'gi')		
		return !!JSON.stringify(this.config || {}).match(regex)		
	}


}



