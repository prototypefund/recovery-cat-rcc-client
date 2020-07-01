import 	{	
			Injectable,
			Inject ,
			Optional			
		} 								from '@angular/core'

import	{	Question,
			QuestionConfig,
			QuestionStore,
		}								from '@rcc/core'

import	{
			MetaStore,			
			ItemAction
		}								from '@rcc/common'

import	{	
			QUESTION_STORES,
			QUESTION_ACTIONS
		}								from './questionaire.commons'


@Injectable()
export class Questionaire extends MetaStore<QuestionConfig, Question, QuestionStore> {

	constructor(
		@Optional() @Inject(QUESTION_STORES) 
		stores		: QuestionStore[],

		@Optional() @Inject(QUESTION_ACTIONS) 
		itemActions	: ItemAction<Question>[]
	) {
		super(stores, itemActions)
	}

	
	public handleIdWithoutItem(id: string): Question | null {
		return new Question(id)
	}
}
