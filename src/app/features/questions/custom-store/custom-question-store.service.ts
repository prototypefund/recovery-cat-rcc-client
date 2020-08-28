import 	{ 	Injectable } 		from '@angular/core'

import	{	
			Question,
			QuestionStore,
			QuestionConfig
		}						from '@rcc/core'

import	{
			RccStorage
		}						from '@rcc/common'



@Injectable()
export class CustomQuestionStore extends QuestionStore {

	public readonly name = "CUSTOM_QUESTION_STORE.NAME"

	constructor(
		rccStorage:	RccStorage
	){
		super(
			rccStorage.createItemStorage('rcc-custom-questions'),
		)
	}

	public async addQuestionConfig(config: QuestionConfig): Promise<any> {
		const question = this.addConfig(config)
		return 	this.storeAll()
				.then( () => question)
	}

	public async delete(question: Question): Promise<any> {			 

		if(!this.removeItem(question)) throw "CustomQuestionStore.delete: Unable to delete question with id: "+question.id  
		
		
		return 	this.storeAll()
				.then( () => question )
	}
}

