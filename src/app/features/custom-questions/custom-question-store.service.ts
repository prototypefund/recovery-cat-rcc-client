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

	public readonly name = "CustomQuestionStore"

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
		const id = this.identifyItem(question)
		if(!this.map.get(id)) return Promise.reject("CustomQuestionStore.delete: Unable to find question with id: "+id)

		this.map.delete(id)
		return this.storeAll()
	}
}

