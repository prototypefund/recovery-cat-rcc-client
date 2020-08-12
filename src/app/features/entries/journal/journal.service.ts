import 	{	Injectable 			} 	from '@angular/core'

import	{	
			EntryStore,
			Entry,
			EntryConfig,
			ReportConfig			
		}							from '@rcc/core'

import	{	RccStorage			}	from '@rcc/common'


@Injectable()
export class Journal extends EntryStore {

	constructor(
		rccStorage: RccStorage
	) { 
		super(rccStorage.createItemStorage('rcc-journal'))
	}

	async log(id : string, value : string|number, timestamp? : number, note? : string ): Promise<Entry> {
		timestamp = timestamp || Date.now()

		const entry = this.addConfig([id, value, timestamp, note])

		return 	this.storeAll()
				.then( () => entry )
		
	}

	async removeEntry(entry: Entry){

	}

	public exportReportConfig(): ReportConfig {
		return this.items.map( (entry: Entry) => entry.config )
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
