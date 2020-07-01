//TODO Plugin for Question Types!

import	{	
			Item
		}								from "@rcc/core/items"

import	{
			QuestionConfig,
			QuestionConfigOption,
			TranslationMap
		}								from "./question-config.interface"

import	{	
			QuestionValidator,
			QuestionValidationError 
		}								from './question-validator'


export const QuestionProperties = [
	'id',
	'type',
	'meaning',
	'translations',
	'options',
	'min',
	'max',
	'tags',
	'unit',
]

export function unknownConfig(id: string): QuestionConfig {
	return	{
				id: 			id,
				translations: 	{en: 'Unknown question: #'+id}, //todo use translationservice
				type:			'unknown',
				meaning:		'Missing config for question: #'+id
			}
}


export class Question extends Item<QuestionConfig> {

	public id					: string
	public type					: string
	public meaning				: string
	public translations			: TranslationMap
	public options				: QuestionConfigOption[]
	public min					: number
	public max					: number
	public tags					: string[]
	public unit					: string

	

	constructor(id:string)  
	constructor(config:QuestionConfig) 
	constructor(idOrConfig: string | QuestionConfig){ 

		const config	=	typeof idOrConfig == 'string'
							?	unknownConfig(idOrConfig)
							:	idOrConfig

		super(config)
	}

	set config(config: QuestionConfig){
		QuestionProperties.forEach( (key:string) => (this as any)[key] = (config as any)[key] )
	}

	get config() { 
		const c: any = {}

		QuestionProperties.forEach( (key:string) => c[key] = (this as any)[key] )

		return (c as QuestionConfig)
	}

	public async validateAnswer(value:any):Promise<object | null>{
		return QuestionValidator.validateAnswer(value, this.config)
	}


	

}
