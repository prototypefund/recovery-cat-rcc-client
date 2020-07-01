

import	{	
			Item
		}							from '@rcc/core/items'

import	{	Schedule			}	from '@rcc/core/schedules'

import	{
			SymptomCheckConfig
		}							from './symptom-checks.commons'


//TODO Dates, timestamps and RRULE timezones




export class SymptomCheck extends Item<SymptomCheckConfig> {

	public id				:	string

	public meta				:	{
									source			: string | null
									paused			: boolean | null
									defaultSchedule	: Schedule | null
									start			: Date | null
									creationDate	: Date | null			
								}
	
	public questions		: 	{ 
									id: 		string, 
									schedule: 	Schedule 
								}[]


	set config(config: SymptomCheckConfig){

		this.meta  					= 	{} as any

		this.meta.source 			= 	config.meta.source || null
		this.meta.paused			= 	config.meta.paused || false	
		this.meta.start				= 	config.meta.start 			&& new Date(config.meta.start) 			|| null
		this.meta.creationDate 		= 	config.meta.creationDate 	&& new Date(config.meta.creationDate) 	|| null
		this.meta.defaultSchedule 	= 	new Schedule(
											config.meta.defaultSchedule, 
											this.meta.start
										)

		this.questions				=	config.questions.map( 
											(item: any) => 	typeof item == 'string'
															?	{id: item,		schedule: this.meta.defaultSchedule }
															:	{id: item.id, 	schedule: new Schedule( item.schedule, this.meta.start ) }
										)


	}

	get config(){ 

		let meta:any		=	{
								source:				this.meta.source || null,
								start:				this.meta.start && this.meta.start.toString() || null,
								creationDate:		this.meta.creationDate && this.meta.creationDate.toString() || null,
								paused:				this.meta.paused,
								defaultSchedule:	this.meta.defaultSchedule && this.meta.defaultSchedule.toString() ||null
							}

		for(let key in meta){
			if(meta[key] == null) delete meta[key]
		}


		let	questions	=	this.questions.map( item => {

								let scheduleString = item.schedule && item.schedule.toString()

								return 	!scheduleString || scheduleString == meta.defaultSchedule
										?	item.id
										:	{id: item.id, schedule:  scheduleString}
							})

		return 	{ meta, questions }
	}

	getDue(date_1:Date, date_2:Date): string[]{
		return 	this.questions
				.map( 		(item: any) => item.schedule.dueBetween(date_1, date_2, true).length > 0 && item.id )
				.filter( 	(item: any) => typeof item == 'string')
	}

	addQuestion(id: string, schedule: Schedule){
		this.questions.push({id: id, schedule: schedule || this.meta.defaultSchedule})
	}


	get questionIds()	{ return this.questions.map( item => item.id) }
	

}


