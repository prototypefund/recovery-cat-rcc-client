import	{	Item				}	from '@rcc/core/items'


export interface EntryConfig{
	[index:number]: string|number
	0: 	string			//Question id
	1: 	string|number	//Answer 
	2: 	string|number	//time str or timestamp
	3?:	string			//note
}


export class Entry extends Item<EntryConfig>{

	public 	questionId	: string
	public	answer		: string|number
	public	timestamp	: string|number
	public	note		: string

	public static checkConfig(config: any): config is EntryConfig {
		if(!config) 											return false
		if(!Array.isArray(config)) 								return false
		if(!['string'].includes(typeof config[0])) 				return false	
		if(!['string', 'number'].includes(typeof config[0])) 	return false	
		if(!['string', 'number'].includes(typeof config[0])) 	return false	
		if(!['string', 'undefined'].includes(typeof config[0]))	return false	
		return true
	}

	constructor(config: EntryConfig){
		if(!Entry.checkConfig(config)) throw "Entry.constructor: invalid config."
		super(config)		
	}

	set config(config: EntryConfig){
		this.questionId = config[0]
		this.answer		= config[1]
		this.timestamp  = config[2]
		this.note		= config[3]
	}

	get config(): EntryConfig{
		return [this.questionId, this.answer, this.timestamp, this.note]
	}
}