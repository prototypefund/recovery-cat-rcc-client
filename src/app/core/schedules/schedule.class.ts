import 	{	
			RRule, 
			RRuleSet, 
			rrulestr 
		} 						from 'rrule'

export class Schedule {

	public rrule: any

	constructor(str: string, start: Date) {
		this.rrule = 	new RRule({
							dtstart: start || new Date(), 
							...RRule.parseString(str || 'RRULE:FREQ=DAILY') 
						})
	}

	toString():string{ 
		return this.rrule.toString() 
	}

	dueBetween(date_1: Date, date_2: Date): Date[] {
		return this.rrule.between(date_1, date_2)
	}

}