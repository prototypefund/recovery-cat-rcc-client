import 	{ 	
			Injectable, 
			OnDestroy
		} 							from '@angular/core'

import	{	
			SubscriptionLike,
			from
		}							from 'rxjs'
import	{	
			mergeMap,
			filter
		}							from 'rxjs/operators'

import	{	
			Question,
			QuestionConfig,
			QuestionStore,			
		}							from '@rcc/core'


import	{
			RccStorage,
			IncomingData
		}							from '@rcc/common'



@Injectable()
export class ImportQuestionStore extends QuestionStore implements OnDestroy {

	public readonly name = "IMPORT_QUESTION_STORE.NAME"

	private subscriptions : SubscriptionLike[] = []

	constructor(
		private incomingData	: 	IncomingData,
		private rccStorage		:	RccStorage
	){
		super(
			rccStorage.createItemStorage('rcc-import-questions'),
		)

		this.listenToIncomingData()
	}


	protected listenToIncomingData(){
		this.subscriptions.push(
			this.incomingData
			.pipe(			
				mergeMap( 	(data:any) 	=> { 
					console.group('Import Questions')
					console.log(data)
					console.log(Question.findConfigs(data))
					console.groupEnd()
					return from(Question.findConfigs(data) ) 
				}),				
			)
			.subscribe( this.addQuestionConfig.bind(this) )
		)
	}


	ngOnDestroy(){
		this.subscriptions.forEach( sub => sub.unsubscribe() )
	}



	public async addQuestionConfig(configs: QuestionConfig[])	: Promise<Question[]> 
	public async addQuestionConfig(config: 	QuestionConfig)		: Promise<Question> 
	public async addQuestionConfig(x: 		any)					: Promise<any> 
	{

		console.log('sdfdsf', x)

		if(!(x instanceof Array)) return this.addQuestionConfig([x]).then( arr => arr[0] )

		const questions = x.map( config => this.addConfig(config) )

		return 	this.storeAll()
				.then( () => questions)

	}


	public async deleteQuestion(question: Question): Promise<any> {	
		if(!this.removeItem(question)) throw "CustomQuestionStore.delete: Unable to delete symptom check with id: " + question.id

		return 	this.storeAll()
				.then( () => question)
	}


}
