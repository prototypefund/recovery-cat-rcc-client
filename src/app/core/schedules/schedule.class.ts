import 	{	
			RRule, 
			RRuleSet, 
			rrulestr 
		} 						from 'rrule'

export class Schedule {

	public rrule	: any
	public failed	: boolean


	static isValidDate(d : Date): boolean {
		if(!d) 					return false
		if(!d.getTime)			return false
		if(isNaN(d.getTime()))	return false
	}

	constructor(str?: string, start?: Date) {
		this.set(str,start)

		
	}

	set(str?:string, start?: Date){

		this.failed = false
		
		try {
			const rruleConfig = RRule.parseString(str || 'RRULE:FREQ=DAILY') 

			this.rrule = 	new RRule({
								dtstart: Schedule.isValidDate(start) ? start : new Date(), 
								...rruleConfig
							})
		} catch(e) {
			console.warn(e)
			this.failed = true
		}

	}

	toString(){
		return 	this.rrule.toString() 
	}

	toText():string { 
		return 	this.failed
				?	'Error: unable to parse rule.'
				:	this.rrule.toText() 
	}

	dueBetween(date_1: Date, date_2: Date): Date[] {
		return 	!this.failed && this.rrule.between(date_1, date_2)
	}

}