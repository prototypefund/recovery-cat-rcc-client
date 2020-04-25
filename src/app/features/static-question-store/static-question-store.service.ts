import 	{ 	Injectable } 		from '@angular/core'

import	{	
			Question, 
			QuestionConfig,
			ItemStore
		}						from 'app/rcc'





@Injectable({
	providedIn: 'root'
})
export class StaticQuestionStore extends ItemStore<Question, QuestionConfig> {

	constructor(){
		super({
			itemClass: 	Question,
			storage:	staticStorage,
		})
	}
}

const staticStorage = { getAll: () => Promise.resolve(questions) }

const questions:QuestionConfig[] = [
		{
			id:				'A',
			type:			'integer',
			meaning:		"asking for the weight in kg",
			translations:	{en: "What's your current weight?"},
			tags:			[],
			unit:			'kg'
		},
		{
			id:				'B',
			type:			'float',
			meaning:		"asking for current temperature in degree celsius",
			translations:	{en: "What's your current temperature?"},
			min:			35,
			max:			45,
			tags:			[],
			unit:			"°C"
		},
		{
			id:				'C',
			type:			'integer',
			meaning:		"Rate your well-being",
			translations:	{en:"Rate your well-being!"},
			min:			1,
			max:			5,
			tags:			['scale']
		},
		{
			id:				'D',
			type:			'string',
			meaning:		"What's your current mood?",
			translations:	{en: "What's your current mood?"},
			options:		[ 
								{
									value:			'happy',
									meaning:		'happy',
									translations:	{'en': 'Happy'}
								}, 
								{
									value:			'sad',
									meaning:		'sad',
									translations:	{'en': 'Sad'}
								},
								{
									value:			'energetic',
									meaning:		'energetic',
									translations:	{'en': 'Energetic'}
								},
								{
									value:			'melancholic',
									meaning:		'melancholic',
									translations:	{'en': 'Melancholic'}
								},
								{
									value:			'stressed',
									meaning:		'stressed',
									translations:	{'en': 'Stressed'}
								}
							],
			tags:			[]
		},
		{
			id:				'E',
			type:			'boolean',
			meaning:		"Have you eaten today?",
			translations:	{en:"Have you eaten today?"},
			tags:			[]
		},
		{
			id:				'F',
			type:			'float',
			meaning:		"How tall are you?",
			translations:	{'en': "How tall are you? (rounded down)"},
			options:		[
								{ value:1.4 },
								{ value:1.5 },
								{ value:1.6 },
								{ value:1.7 },
								{ value:1.8 },
								{ value:1.9 },
								{ value:2.0 },
								{ value:2.1 },
								{ value:2.2 },
								{ value:2.3 }
							],		
			unit:			'm'
		}
	]