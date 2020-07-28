import	{	Item				}	from '@rcc/core/items'
import	{	
			Entry,
			EntryConfig 				
		}							from './entry.class'


export type ReportConfig = EntryConfig[]

export class Report extends Item<ReportConfig>{

	public entries : Entry[]


	public static checkConfig(config:any){
		if(!Array.isArray(config)) return false
		return config.every( (x:any) => Entry.checkConfig(x) )
	}


	constructor(config: ReportConfig){
		if(!Report.checkConfig(config)) throw "Report.constructor: invalid config."
		super(config)		
	}

	set config(config: ReportConfig){
		this.entries = Array.from(config).map( (config: EntryConfig) => new Entry(config) )
	}

	get config(): ReportConfig{
		return this.entries.map( (entry: Entry) => entry.config )
	}

	//todo add filter functions
}