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

	protected unknownConfig(id: string): QuestionConfig {
		return	{
					id: 			id,
					translations: 	{en: 'Unknown question: #'+id}, //todo use translationservice
					type:			'unknown',
					meaning:		'Missing config for question: #'+id
				}
	}

	constructor(id:string)  
	constructor(config:QuestionConfig) 
	constructor(idOrConfig: string | QuestionConfig){ 

		super()

		const config	=	typeof idOrConfig == 'string'
							?	this.unknownConfig(idOrConfig)
							:	idOrConfig

		QuestionProperties.forEach( key => (this as any)[key] = (config as any)[key] )
	}


	public async validateAnswer(value:any):Promise<object | null>{
		return QuestionValidator.validateAnswer(value, this.config)
	}

	get config() { 
		const c: any = {}

		QuestionProperties.forEach( (key:string) => c[key] = (this as any)[key] )

		return (c as QuestionConfig)
	}

	

}
