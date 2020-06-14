import 	{	
			RRule, 
			RRuleSet, 
			rrulestr 
		} 						from 'rrule'

export class Schedule {

	public rrule: any


	static isValidDate(d : Date): boolean {
		if(!d) 					return false
		if(!d.getTime)			return false
		if(isNaN(d.getTime()))	return false
	}

	constructor(str: string, start: Date) {

		const rruleConfig = RRule.parseString(str || 'RRULE:FREQ=DAILY') 

		this.rrule = 	new RRule({
							dtstart: Schedule.isValidDate(start) ? start : new Date(), 
							...rruleConfig
						})
	}

	toString():string{ 
		return this.rrule.toString() 
	}

	dueBetween(date_1: Date, date_2: Date): Date[] {
		return this.rrule.between(date_1, date_2)
	}

}