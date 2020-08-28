

import	{	Item				}	from '@rcc/core/items'

import	{	Schedule			}	from '@rcc/core/schedules'

import	{	Subject				}	from 'rxjs'

import	{
			SymptomCheckConfig,
			isSymptomCheckConfig
		}							from './symptom-checks.commons'


//TODO Dates, timestamps and RRULE timezones

export interface DueData {
	symptomChecks:		SymptomCheck[]
	questionIds:		string[]
}


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

	public changes			= new Subject<any>()
	public change$			= this.changes.asObservable()


	static acceptsAsConfig(x:any): boolean {
		return isSymptomCheckConfig(x)
	}


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

	public togglePause(){
		this.meta.paused = !this.meta.paused
		this.changes.next('meta.paused')
	}

	public coversQuestionIds(ids: string[]) {
		return !!this.questions.find( item => ids.find( id => item.id == id) )
	}


	public getDueQuestionIds(date		: 	Date, plus_minus	: number							): string[]
	public getDueQuestionIds(date		: 	Date, minus			: number,		plus	: number	): string[]
	public getDueQuestionIds(date_1		:	Date, date_2		: Date								): string[] 
	public getDueQuestionIds(date		:	Date, x				: any, 			y?		: number	): string[] 
	{

		return 	Array.from( new Set(
					this.questions
					.filter(	(item) 			=> item.schedule.dueBetween(date, x, y).length > 0)
					.map(		(item) 			=> item.id)
				))


	}

	public addQuestion(id: string, schedule: Schedule){
		this.questions.push({id: id, schedule: schedule || this.meta.defaultSchedule})
	}


	get questionIds()	{ return this.questions.map( item => item.id) }
	

}


