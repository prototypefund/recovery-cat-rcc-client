import 	{ 	Injectable } 		from '@angular/core'

import	{	
			Question, 
			QuestionConfig,
			ItemStore
		}						from 'app/rcc'

import	{
			RccStorage
		}						from 'app/core'



@Injectable({
	providedIn: 'root'
})
export class StaticQuestionStore extends ItemStore<Question, QuestionConfig> {

	constructor(
		rccStorage:	RccStorage
	){
		super({
			itemClass: 	Question,
			storage:	rccStorage,
		})
	}
}

