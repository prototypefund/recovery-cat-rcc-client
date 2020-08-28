import	{	Injectable					}	from '@angular/core'

import	{	Subject						}	from 'rxjs'
import	{	map							}	from 'rxjs/operators'
import	{	DueData						}	from '@rcc/core'
import	{	Journal						}	from '@rcc/features/entries'
import	{	SymptomCheckMetaStore		}	from '@rcc/features/symptom-checks/meta-store'


@Injectable()
export class DueQuestionsService {


	public checks	=	new Subject<DueData>()
	public check$	=	this.checks.asObservable()
	public count$	=	this.checks.pipe(map( dd => dd.questionIds.length ))	

	constructor(
		public journal					: Journal,
		public symptomCheckMetaStore	: SymptomCheckMetaStore
	){}


	public async hasRecentAnswer(questionId: string): Promise<boolean> {
		const most_recent_entry = await this.journal.getMostRecentEntry(questionId)

		if(!most_recent_entry) return false

		return 	Math.abs(
						Date.now() 
					- 	most_recent_entry.date.getTime()
				) 
				< 	1000*60*60*12			
				
	}


	public async get(): Promise<DueData> {
		const due_data 					= 	await this.symptomCheckMetaStore.getDue(new Date(), 1000*60*60*12)
		const due_questions_ids			= 	Array.from( new Set(due_data.map( item => item.questionIds ).flat() ))

		const unanswered_question_ids	= 	(
												await Promise.all(
													due_questions_ids
													.map( question_id => 	this.hasRecentAnswer(question_id)
																			.then(h => !h && question_id)
													)
												)
											).filter( id => !!id )


		if(unanswered_question_ids.length == 0 )  throw "DueQuestionService.get(): no unanswered due questions."
			
		const due_symptom_checks		=	due_data
											.filter( 	item => unanswered_question_ids.some(id => item.questionIds.includes(id) ))
											.map(		item => item.symptomChecks)
											.flat()

		const result 					=	{
												symptomChecks: 	due_symptom_checks,
												questionIds:	unanswered_question_ids
											}

		this.checks.next(result)									

		return 	result


	}

	public check(){
		this.get().catch( console.log )
	}


	public onStartUp(){

		this.check()
		setInterval( () => this.check(), 1000*60*60*10) //TODO

	}


}
