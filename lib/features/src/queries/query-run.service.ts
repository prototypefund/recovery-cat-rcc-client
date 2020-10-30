import	{	Injectable				}	from '@angular/core'
import	{	
			Question,
			Entry
		}								from '@rcc/core'
import	{	Questionaire			}	from '../questions'
import	{	Journal					}	from '../entries'
import	{	
			Query,
			SubmitEntryFn ,	
			CancelEntryFn 					
		}								from './query.class'

export class QueryRun {

	public queries		: Query[]
	public timestamp	: number

	constructor(
			questions		: Question[],
			submitEntryFn	: SubmitEntryFn,
			cancelEntryFn	: CancelEntryFn
	){
		this.timestamp	= 	Date.now()
		this.queries	= 	questions.map( (question: Question) => new Query( question, submitEntryFn, cancelEntryFn )	)
	}
}

@Injectable()
export class QueryRunService {


  	constructor(
  		public questionaire	: Questionaire,
  		public journal		: Journal		
  	){}

  	public async start(ids: string[]) : Promise<QueryRun>{
  		const questions = 	await this.questionaire.get(ids)
  		const queryRun	=	new	QueryRun(
		  						questions, 
								(id:string, answer:string, note:string)	=> this.journal.log(id,answer,note), 
								(entry: Entry)							=> this.journal.removeEntry(entry)
		  					)

		return queryRun
  	}


}