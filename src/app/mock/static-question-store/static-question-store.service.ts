import 	{ 	Injectable } 		from '@angular/core'

import	{	
			Question,
			QuestionConfig,
			QuestionStore
		}						from '@rcc/core'




@Injectable()
export class StaticQuestionStore extends QuestionStore {

	public readonly name = "STATIC_QUESTION_STORE.NAME"

	constructor(){
		super(staticStorage)
	}
}

const staticStorage = { getAll: () => Promise.resolve(configs) }

const configs:QuestionConfig[] = [
		{
			id:				'A',
			type:			'integer',
			meaning:		"How stressed were you before going to work today?",
			translations:	{
								'en': "How stressed were you before going to work today?",
								'de': "Wie gestresst waren Sie, bevor Sie heute zur Arbeit gingen?"
							},
			options:		[
								{ value:0  , translations: { en: 'not at all', 	de: 'gar nicht'	}	},
								{ value:1  , meaning: ''},
								{ value:2  , meaning: ''},
								{ value:3  , meaning: ''},
								{ value:4  , meaning: ''},
								{ value:5  , meaning: ''},
								{ value:6  , meaning: ''},
								{ value:7  , meaning: ''},
								{ value:8  , meaning: ''},
								{ value:9  , meaning: ''},
								{ value:10 , translations: { en: 'extremely',	de: 'extrem'	}	}
							],		
			tags:			['scale']
		},
		{
			id:				'B',
			type:			'string',
			meaning:		"What is your overall mood today?",
			translations:	{
								en: "What is your overall mood today?",
								de: "Wie ist Ihre allgemeine Stimmung heute?"
							},
			options:		[
								{ 
									value: 'depressed',
									translations:{
										'en': 'depressed',
										'de': 'bedrückt'
									}
								}, 
								{ 
									value: 'neutral',
									translations:{
										en: 'neutral',
										de: 'neutral'
									}
								},
								{
									value: 'excited',
									translations: {
										en: 'excited',
										de: 'enthusiastisch'
									}
								}
							]

		},
		{
			id:				'C',
			type:			'integer',
			meaning:		"How was your appetite today?",
			translations:	{
								'en': "How is your appetite today?",
								'de': "Wie ist Ihr Appetit heute?"
							},
			options:		[
								{ value:0  , translations: { en: 'very bad', 	de: 'sehr schlecht'		}	},								
								{ value:1  , meaning: ''},
								{ value:2  , meaning: ''},
								{ value:3  , meaning: ''},
								{ value:4  , meaning: ''},
								{ value:5  , meaning: ''},
								{ value:6  , meaning: ''},
								{ value:7  , meaning: ''},
								{ value:8  , meaning: ''},
								{ value:9  , meaning: ''},
								{ value:10 , translations: { en: 'very good',	de: 'sehr gut'	}	}
							],		
			tags:			['scale']
		},

		{
			id:				'D',
			type:			'boolean',
			meaning:		"Did you have breakfast today?",
			translations:	{
								'en': "Did you have breakfast today?",
								'de': "Haben Sie heute gefrühstückt?"
							},
		},



		// {
		// 	id:				'B',
		// 	type:			'decimal',
		// 	meaning:		"asking for current temperature in degree celsius",
		// 	translations:	{en: "What's your current temperature?"},
		// 	min:			35,
		// 	max:			45,
		// 	tags:			[],
		// 	unit:			"°C"
		// },
		// {
		// 	id:				'C',
		// 	type:			'integer',
		// 	meaning:		"Rate your well-being",
		// 	translations:	{en:"Rate your well-being!"},
		// 	min:			1,
		// 	max:			5,
		// 	tags:			['scale']
		// },
		// {
		// 	id:				'D',
		// 	type:			'string',
		// 	meaning:		"What's your current mood?",
		// 	translations:	{en: "What's your current mood?"},
		// 	options:		[ 
		// 						{
		// 							value:			'happy',
		// 							meaning:		'happy',
		// 							translations:	{'en': 'Happy'}
		// 						}, 
		// 						{
		// 							value:			'sad',
		// 							meaning:		'sad',
		// 							translations:	{'en': 'Sad'}
		// 						},
		// 						{
		// 							value:			'energetic',
		// 							meaning:		'energetic',
		// 							translations:	{'en': 'Energetic'}
		// 						},
		// 						{
		// 							value:			'melancholic',
		// 							meaning:		'melancholic',
		// 							translations:	{'en': 'Melancholic'}
		// 						},
		// 						{
		// 							value:			'stressed',
		// 							meaning:		'stressed',
		// 							translations:	{'en': 'Stressed'}
		// 						}
		// 					],
		// 	tags:			[]
		// },
		// {
		// 	id:				'E',
		// 	type:			'boolean',
		// 	meaning:		"Have you eaten today?",
		// 	translations:	{en:"Have you eaten today?"},
		// 	tags:			[]
		// },
		// {
		// 	id:				'F',
		// 	type:			'decimal',
		// 	meaning:		"How tall are you?",
		// 	translations:	{'en': "How tall are you? (rounded down)"},
		// 	options:		[
		// 						{ value:1.4 },
		// 						{ value:1.5 },
		// 						{ value:1.6 },
		// 						{ value:1.7 },
		// 						{ value:1.8 },
		// 						{ value:1.9 },
		// 						{ value:2.0 },
		// 						{ value:2.1 },
		// 						{ value:2.2 },
		// 						{ value:2.3 }
		// 					],		
		// 	unit:			'm'
		// },

		// {
		// 	id:				'G',
		// 	type:			'integer',
		// 	meaning:		"asking for the weight in kg",
		// 	translations:	{en: "What's your current weight?"},
		// 	tags:			[],
		// 	unit:			'kg'
		// },		

	]