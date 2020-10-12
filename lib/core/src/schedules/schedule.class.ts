import 	{	
			RRule, 
			RRuleSet, 
			rrulestr 
		} 						from 'rrule'


export class Schedule {

	public rrule	: any
	public failed	: boolean


	//TODO use Iso with Timezone
	//Input will be treated as a representation of local Time. Timezone will be ignored. YYYY-MM-DD HH:MM
	static localToString(date		: Date						) : string
	static localToString(timestamp	: number					) : string
	static localToString(timestr	: string					) : string
	static localToString(x			: Date | number | string	) : string 
	{

		if(x instanceof Date) {
			return 		String(x.getFullYear()) 
					+ 	'-' 
					+	String(x.getMonth() + 1).padStart(2,'0') 
					+	'-' 
					+	String(x.getDate()).padStart(2,'0') 
					+	' ' // not T because this will not end up as ISO...
					+	String(x.getHours()).padStart(2,'0')
					+ 	':' 
					+	String(x.getMinutes()).padStart(2,'0') 
		}

		if(typeof x == 'number') return this.localToString(new Date(x))

		if(typeof x == 'string') {		
			return this.localToString(this.stringToLocal(x))
		}
	}

	static stringToLocal(str: string): Date {
		let s: number[]

		try{

			s =	str.match(/^(\d{4})-(\d{2})-(\d{2})[\sT_-](\d{2}):(\d{2})/)
				.slice(1) 
				.map( x => parseInt(x) )

			return new Date(s[0], s[1]-1, s[2], s[3], s[4], 0, 0)
				
		} catch(e){
			console.warn("Schedule.stringToLocal(): unable to read input: "+str)
			return new Date(NaN)
		}
		
	}


	static yesterday(time?	: string							) : Date
	static yesterday(hour?	: number,	minutes?	: number	) : Date
	static yesterday(x?		: any, 		y?			: any		) : Date
	{

		if(typeof x == 'string'){
			try{
				const m = x.match(/^(\d{1,2}):(\d{1,2})$/)
				if(!m[1] || !m[2])	throw "Schedule.yesterday(): wrong time format: ' + x + ' use: HH:MM'"
				return this.yesterday(parseInt(m[1]), parseInt(m[2]))	
			} catch(e) {
				throw "Schedule.yesterday(): "+e
			}
		}

		if(x === undefined) x = 12
		if(y === undefined) y = 0

		if(typeof x != 'number' || typeof y != 'number') throw "Schedule.yesterday() invalid parameters."

		let date = new Date( Date.now() - 1000*60*60*24 )	

		date.setHours(x, y, 0)

		return date
	}

	static isValidDate(d : Date): boolean {
		if(!d) 					return false
		if(!d.getTime)			return false
		if(isNaN(d.getTime()))	return false
	}







	constructor(str?: string, start?: Date) {
		this.set(str,start)
	}







	public set(str?:string, start?: Date){

		this.failed = false
		
		try {

			console.log(str)
			const rruleConfig = RRule.parseString(str || 'RRULE:FREQ=DAILY') 

			this.rrule = 	new RRule({
								dtstart: Schedule.isValidDate(start) ? start : Schedule.yesterday("12:00"), 
								...rruleConfig
							})
		} catch(e) {
			console.warn(e)
			this.failed = true
		}

	}

	public toString(){
		return 	this.rrule.toString() 
	}



	public toText():string { 
		return 	this.failed
				?	'Error: unable to parse rule.'
				:	this.rrule.toText() 
	}


	public dueBetween(date		: 	Date, plus_minus	: number							): Date[]
	public dueBetween(date		: 	Date, minus			: number,		plus	: number	): Date[]
	public dueBetween(date_1	:	Date, date_2		: Date								): Date[] 
	public dueBetween(date		:	Date, x				: any, y?		: number			): Date[] 
	{


		let date_1: Date
		let date_2: Date


		if(this.failed) return []
		


		if(		
				(date 	instanceof Date) 
			&&	(x 		instanceof Date) 
		) {
			date_1 = date
			date_2 = x

			return 	this.rrule.between(date_1, date_2)
		} 
		

		if( 	
				(date instanceof Date) 
			&&	(typeof x == 'number') 
			&&	(typeof y == 'number') 
		) {

			date_1 = new Date( date.getTime() - x )
			date_2 = new Date( date.getTime() + y )			

			return this.dueBetween(date_1, date_2)
		}



		if( 
				(date instanceof Date) 
			&&	typeof x == 'number'
		){
			return this.dueBetween(date, x, x)
		}

		throw "Schedule.dueBetween(): invalid parameters: " + arguments
		
	}

}


