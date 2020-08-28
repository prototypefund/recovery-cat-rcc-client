import 	{	
			Injectable,
			Inject,
			Optional
		} 								from '@angular/core'

import	{	Question,
			QuestionConfig,
			QuestionStore,
		}								from '@rcc/core'

import	{
			MetaStore,			
			ItemAction,
			MetaAction
		}								from '@rcc/common'

import	{	
			QUESTION_STORES,
			QUESTION_ACTIONS,
			QUESTION_META_ACTIONS
		}								from './questionaire.commons'


@Injectable()
export class Questionaire extends MetaStore<QuestionConfig, Question, QuestionStore> {

	public name = "QUESTIONAIRE.NAME"

	constructor(
		@Optional() @Inject(QUESTION_STORES) 
		stores			: QuestionStore[],

		@Optional() @Inject(QUESTION_ACTIONS) 
		itemActions		: ItemAction<Question>[],

		@Optional() @Inject(QUESTION_META_ACTIONS)
		metaActions		: MetaAction<Question>[]
	) {
		super(stores, itemActions, metaActions)
	}

	
	public handleIdWithoutItem(id: string): Question | null {
		return new Question(id)
	}
}
