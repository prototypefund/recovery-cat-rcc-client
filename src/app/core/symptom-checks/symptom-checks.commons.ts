
export interface SymptomCheckMeta {	
	source?:			string		//Source
	defaultSchedule?:	string		//rrule, default schedule	
	creationDate?:		string		//Some date format
	paused?:			boolean
	start?:				string		//Some date format
}


export interface SymptomCheckQuestionSchedule {
	id:				string 		// Question id
	schedule:		string		// rrule
}


export type SymptomCheckItem = string | SymptomCheckQuestionSchedule


export interface SymptomCheckConfig {
	meta:				SymptomCheckMeta
	questions:			SymptomCheckItem[]
}

