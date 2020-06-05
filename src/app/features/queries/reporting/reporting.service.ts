import 	{	Injectable 			} 	from '@angular/core'

import	{	
			ReportStore,
			Report			
		}							from '@rcc/core'

import	{	RccStorage			}	from '@rcc/common'


@Injectable()
export class ReportingService extends ReportStore {

	constructor(
		rccStorage: RccStorage
	) { 
		super(rccStorage.createItemStorage('rcc-reports'))
	}


	async submit(id : string, value : string|number, timestamp? : number ): Promise<Report> {
		timestamp = timestamp || Date.now()

		const report = this.addConfig([id, value, timestamp])

		return 	this.storeAll()
				.then( () => report )
		
	}
}

// private reports:Report[] = []

	// public ready: Promise<any>

	// //Todo save to some storage

	// constructor(
	// 	private Questionaire: Questionaire
	// ){

	// 	this.ready = Promise.resolve()
	// }


	// async getQueries(ids: string[]): Promise<Query[]> {

	// 	await this.ready

	// 	let questions 	= await this.Questionaire.getQuestions(ids)
	// 	let queries		= questions.map(question => new Query( question, this.submitQuery.bind(this)) )

	// 	return queries
	// }


	// submit(id: string, value: string|number, date?:Date){

	// 	console.log('Answer submitted:', id, value)

	// 	this.reports.push([
	// 		id,
	// 		value,
	// 		date && date.valueOf() || Date.now()
	// 	])
	// }

	// submitQuery(query:Query){
	// 	return this.submit(query.question.id, query.answer, query.date )
	// }

	// get():Report[]{
	// 	return this.reports
	// }
