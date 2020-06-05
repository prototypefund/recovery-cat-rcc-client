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


export abstract class QuestionStore extends ItemStore<Question,QuestionConfig> {


	constructor(
		storage	: ItemStorage<Question, QuestionConfig>
	){		
		super({
			itemClass: 	Question,
			storage
		})
	}
}