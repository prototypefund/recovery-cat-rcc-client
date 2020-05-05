import 	{	
			Injectable,
			Inject ,
			Optional			
		} 							from '@angular/core'

import	{	Question,
			QuestionConfig,
			QuestionStore,			
		}							from '@rcc/core'

import	{	QUESTION_STORES		}	from './question-stores.token'


interface QuestionActions {
	delete:		null | ((question: Question, store: QuestionStore) => Promise<any>)
}

@Injectable()
export class Questionaire {

	public stores: QuestionStore[]

	constructor(
		@Optional() @Inject(QUESTION_STORES) 
		stores: QuestionStore[] = [],
	) {
		this.stores = stores || [] 
	}


	public async lookUp(ids:string[]): Promise<Question[]>{
		const lookUpPromises 	= this.stores.map( store => store.lookUp(ids) )
		const itemArrays 		= await Promise.all(lookUpPromises)  //TODO: deal with undefined!

		return itemArrays.flat().filter( item => item != undefined)
	}

	private async beforeDelete(): Promise<any>{
		return Promise.resolve()
	}

	public getActions(question: Question, store: QuestionStore): QuestionActions {
		return	{
					delete : 	typeof store.delete == 'function'
								?	() => this.beforeDelete().then( ()=> store.delete(question) )
								:	null
				}

	}

}
