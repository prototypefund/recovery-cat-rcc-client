import 	{	
			Injectable,
			Inject ,
			Optional			
		} 							from '@angular/core'

import	{	Question,
			QuestionConfig,
			QuestionStore,			
		}							from '@rcc/core'

import	{	QUESTION_STORES		}	from './questionaire.commons'


export interface StoreActions {
	delete:		null | ((question: Question, store: QuestionStore) => Promise<any>)
}

@Injectable()
export class Questionaire {


	constructor(
		@Optional() @Inject(QUESTION_STORES) 
		public stores: QuestionStore[] = [],		
	) {
		console.log('Questionaire.constructor!!')				
	}


	public async lookUp(ids:string[]): Promise<Question[]>{
		const lookUpPromises 	= this.stores.map( store => store.lookUp(ids) )
		const itemArrays 		= await Promise.all(lookUpPromises)  //TODO: deal with undefined!

		return itemArrays.flat().filter( item => item != undefined)
	}

	private async beforeDelete(): Promise<any>{
		return Promise.resolve()
	}

	public getStoreActions(question: Question, store: QuestionStore): StoreActions {
		return	{
					delete : 	typeof store.delete == 'function'
								?	() => this.beforeDelete().then( ()=> store.delete(question) )
								:	null
				}

	}

}
