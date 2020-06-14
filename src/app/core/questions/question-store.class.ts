import	{	
			Item,
			ItemStore,
			ItemStorage
		}								from "@rcc/core/items"

import	{
			QuestionConfig,
		}								from "./question-config.interface"

import	{
			Question
		}								from "./question.class"


export abstract class QuestionStore extends ItemStore<QuestionConfig, Question> {


	constructor(
		storage	: ItemStorage<QuestionConfig, Question>
	){		
		super({
			itemClass: 	Question,
			storage
		})
	}
}