//TODO Plugin for Question Types!

import	{	
			Item
		}								from "./item-store.class"

import	{
			QuestionConfig,
			QuestionConfigOption,
			TranslationMap
		}								from "./question-config.interface"

import	{	
			QuestionValidator,
			QuestionValidationError 
		}								from './question-validator'





export class Question extends Item {

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

		this.id				= config.id
		this.type			= config.type
		this.meaning		= config.meaning
		this.translations	= config.translations
		this.options		= config.options
		this.min			= config.min
		this.max			= config.max
		this.tags			= config.tags
		this.unit			= config.unit
	}


	public async validateAnswer(value:any):Promise<object | null>{
		return QuestionValidator.validateAnswer(value, this.config)
	}

	get config() { 
		return 	{
					id: 			this.id,
					type: 			this.type,
					meaning: 		this.meaning,
					translations:	this.translations
				}
	}

	

}
