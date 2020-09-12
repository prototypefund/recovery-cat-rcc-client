import	{ 
			NgModule 
		} 									from '@angular/core'

import	{	IncomingDataModule			}	from '@rcc/common'
import	{	ImportQuestionStore			}	from './import-question-store.service'
import	{	QuestionaireModule			}	from '../questionaire'


const itemActions 		= 	[
								{
									label: 			'QUESTION_STORE.ACTIONS.DELETE',
									store: 			ImportQuestionStore,
									handler: 		(item: any, store: any) => store.deleteQuestion(item),
									icon:			'delete',
									successMessage:	'CUSTOM_QUESTION_STORE.ACTIONS.DELETE_SUCCESS',
									role:			'destructive' as const

								},
							]

@NgModule({
	providers: [
		ImportQuestionStore
	],
	imports: [
		QuestionaireModule.forChild([ImportQuestionStore], itemActions),
		IncomingDataModule
	]
})
export class ImportQuestionStoreModule { 

	constructor(
		importQuestionStore	: ImportQuestionStore
	){}

}
