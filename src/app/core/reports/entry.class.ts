import	{	Item				}	from '@rcc/core/items'
import	{	Schedule			}	from '@rcc/core/schedules'

export type EntryConfig = [
	//[index:number]: string|number|boolean
	string,					//Question id
	string|number|boolean,	//Answer 
	string,					//local Time String! TODO
	string?,				//note
]


export class Entry extends Item<EntryConfig>{

	public 	questionId	: string
	public	answer		: string|number|boolean
	public	date		: Date
	public	note		: string

	public static checkConfig(config: any): config is EntryConfig {
		if(!config) 													throw "Entry.constructor: missing config."
		if(!Array.isArray(config)) 										throw "Entry.constructor: config not an array."
		if(typeof config[0] != 'string')								throw "Entry.constructor: config[0] not a string."
		if(!['string', 'number', 'boolean'].includes(typeof config[1])) throw "Entry.constructor: config[1] not a string | number | boolean."
		if(typeof config[2] != 'string') 								throw "Entry.constructor: config[2] not a string."
		if(!['string', 'undefined'].includes(typeof config[3]))			throw "Entry.constructor: config[3] present but not a string."
		return true
	}

	constructor(config: EntryConfig){
		try{ 		Entry.checkConfig(config)	 			}
		catch(e){ 	console.error(config); console.log(e)	}

		super(config)		
	}

	set config(config: EntryConfig){
		this.questionId = config[0]
		this.answer		= config[1]
		this.date		= Schedule.stringToLocal(config[2])
		this.note		= config[3]
	}

	get config(): EntryConfig{
		return [this.questionId, this.answer, Schedule.localToString(this.date), this.note]
	}
}