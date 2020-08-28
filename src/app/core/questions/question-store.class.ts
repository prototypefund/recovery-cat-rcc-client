import	{	
			Item,
			ItemStore,
			ItemStorage
		}								from "@rcc/core/items"

import	{
			QuestionConfig,
		}								from "./questions.commons"

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