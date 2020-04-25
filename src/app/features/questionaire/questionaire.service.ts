import 	{	
			Injectable,
			Inject ,
			Optional			
		} 							from '@angular/core'

import	{	Question,
			QuestionConfig,
			ItemStore			
		}							from 'app/rcc'
import	{	QUESTION_STORES		}	from './question-stores.token'

//TODO: Make Stores Injectable?

@Injectable({
	providedIn: 'root'
})
export class Questionaire {

	questionStores: ItemStore<Question,QuestionConfig>[]

	constructor(
		@Optional() @Inject(QUESTION_STORES) 
		questionStores: ItemStore<Question,QuestionConfig>[] = []	
	) {
		this.questionStores = questionStores || [] 
	}

	public get items(): Question[] {
		return 	this.questionStores
				.map( store => store.items)
				.flat()
	}

	public async lookUp(ids:string[]): Promise<Question[]>{
		const lookUpPromises 	= this.questionStores.map( store => store.lookUp(ids) )
		const itemArrays 		= await Promise.all(lookUpPromises) 

		return itemArrays.flat()
	}

}
