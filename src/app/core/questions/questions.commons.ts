export interface TranslationMap {
	[index:string]:	string
}

export interface StringOptionConfig{
	value:			string,
	meaning?:		string,
	translations:	TranslationMap
}

export interface NumberOptionConfig{
	value:			number,
	meaning?:		string,
	translations?:	TranslationMap
}
export type QuestionConfigOption = StringOptionConfig|NumberOptionConfig


export type QuestionType = 'decimal' | 'integer' | 'string' | 'boolean' | 'unknown'

export interface QuestionConfig {
	id:				string,
	type:			QuestionType,				//string, integer, decimal...
	translations:	TranslationMap,
	meaning?:		string,
	min?:			number, 
	max?:			number,
	options?:		QuestionConfigOption[],
	tags?:			string[],
	unit?:			string,
	note?:			string
}




export function isNumberOptionConfig(x:any): x is NumberOptionConfig {

	if( typeof x.value != 'number') 						return false
	if(x.tranlsation && !isTranslationMap(x.translations))	return false
	
	return true
}



export function isStringOptionConfig(x:any): x is StringOptionConfig {
	
	if(typeof x.value != 'string') 			return false
	if(!isTranslationMap(x.translations))	return false

	return true	
}



export function isQuestionType(x:any): x is QuestionType {
	return ['decimal', 'integer', 'string', 'boolean'].includes(x)	
}



export function isTranslationMap(x:any): x is TranslationMap {
	if(!(x instanceof Object)) 	return false

	if(Object.keys(x).length == 0) return false
	if(Object.keys(x)	.some(	(key:any) 	=> typeof key 	!= 'string' ) ) return false
	if(Object.values(x)	.some(	(value:any)	=> typeof value	!= 'string'	) ) return false	

	return true
}



export function isQuestionConfig(x:any): x is QuestionConfig {

	if(typeof x.id 		!= 'string') 		return false
	if(!isQuestionType(x.type))				return false
	if(!isTranslationMap(x.translations))	return false	

	if(x.options){

		if( ['decimal', 'integer'].includes(x.type)	&& !x.options.every( isNumberOptionConfig) )	return false

		if( ['string'].includes(x.type) 			&& !x.options.every( isStringOptionConfig) )	return false

		if( ['boolean'].includes(x.type)) 	return false

		if( ['unknown'].includes(x.type)) 	return false			

	}

	return true
}