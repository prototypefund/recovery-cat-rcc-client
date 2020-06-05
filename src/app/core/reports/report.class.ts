import	{	Item				}	from '@rcc/core/items'
import 	{	ReportConfig		}	from './reports.commons'

export class Report extends Item<ReportConfig>{

	public 	questionId	: string
	public	answer		: string|number
	public	timestamp	: number

	constructor(config: ReportConfig){
		super()
		this.questionId = config[0]
		this.answer		= config[1]
		this.timestamp  = config[2]
	}

	get config(): ReportConfig{
		return [this.questionId, this.answer, this.timestamp]
	}
}