import	{	
			Item,
			ItemStore,
			ItemStorage
		}								from "./item-store.class"

import	{
			QuestionConfig,
		}								from "./question-config.interface"

import	{
			Question
		}								from "./question.class"


export abstract class QuestionStore extends ItemStore<Question,QuestionConfig> {


	constructor(
		storage	: ItemStorage<QuestionConfig>
	){		
		super({
			itemClass: 	Question,
			storage
		})
	}
}