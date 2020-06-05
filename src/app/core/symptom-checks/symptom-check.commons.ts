
export interface SymptomCheckMeta {	
	source?:			string		//Source
	defaultSchedule?:	string		//rrule, default schedule	
	start?:				string		//Some date Format, when to actually start notifications
	creationDate?:		string		//Some date format
	paused?:			boolean
}


export interface SymptomCheckQuestionSchedule {
	id:				string 		// Question id
	schedule:		string		// rrule
}


export type SymptomCheckItem = string | SymptomCheckQuestionSchedule


export interface SymptomCheckConfig {
	[index:number]:	any
	meta:				SymptomCheckMeta
	questions:			SymptomCheckItem[]
}

