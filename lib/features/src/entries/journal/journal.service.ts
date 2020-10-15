import 	{	Injectable 			} 	from '@angular/core'

import	{	
			EntryStore,
			Entry,
			EntryConfig,
			ReportConfig,
			Schedule			
		}							from '@rcc/core'

import	{	RccStorage			}	from '@rcc/common'


@Injectable()
export class Journal extends EntryStore {

	public name = "JOURNAL.NAME"

	constructor(
		rccStorage: RccStorage
	) { 
		super(rccStorage.createItemStorage('rcc-journal'))
	}

	async log(id : string, value : string|number, note? : string, date? : string ): Promise<Entry> {
		
		await this.ready 

		date = Schedule.localToString(Date.now())

		const entry = this.addConfig([id, value, date, note])

		return 	this.storeAll()
				.then( () => entry )
		
	}

	async removeEntry(entry: Entry){
		await this.ready

		this.removeItem(entry)

		await this.storeAll()

		return entry
	}

	public async getMostRecentEntry( questionId: string ): Promise<Entry | null> {

		await this.ready
		return 	this.items
				.filter( entry 		=> entry.questionId == questionId )
				.sort( 	(e1, e2)	=> (e1.date.getTime() > e2.date.getTime()) ? 1 : -1 )
				[0] || null
	}

/*	public async exportReportConfig(): Promise<ReportConfig> {
		await this.ready
		return this.items.map( (entry: Entry) => entry.config )
	}*/
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
