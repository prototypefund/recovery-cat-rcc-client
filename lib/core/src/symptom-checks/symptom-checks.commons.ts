
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



//maybe check for surplus properties?
export function isSymptomCheckConfig(x: any): x is SymptomCheckConfig{

	if( !(x.meta instanceof Object) ) 		return false
	if( !(x.questions instanceof Array) )	return false

	if( !x.questions.every( (q:any) => 	typeof q == 'string' 
										?	true 
										:	(		typeof q.id 		== 'string' 
												&&	typeof q.schedule 	== 'string'
											)
	)) return false	

	return true
}