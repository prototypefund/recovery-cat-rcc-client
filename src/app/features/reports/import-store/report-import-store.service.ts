import	{	
			Injectable,
			OnDestroy	
		}								from '@angular/core'
import	{	SubscriptionLike		}	from 'rxjs'
import	{	map						}	from 'rxjs/operators'
import	{	IncomingData			}	from '@rcc/common'
import 	{	
			ReportStore,
			Report,
			ReportConfig				
		}								from '@rcc/core'


const noStorage = { getAll: () => Promise.resolve([]) }


@Injectable()
export class ReportImportStore extends ReportStore implements OnDestroy{

	private subscriptions: SubscriptionLike[] = []

	constructor(
		private incomingData: IncomingData
	){
		super(noStorage)

		this.listenToIncomingData()
	}


	protected listenToIncomingData(){
		this.subscriptions.push(
			this.incomingData
			.pipe(
				map( (data:any) => {
					if(Report.acceptsAsConfig(data))	return [data]
					if(data instanceof Array) 				return data.filter( (item:any) => Report.acceptsAsConfig(item))
					return[]	
				})
			)
			.subscribe( (reportConfigs: ReportConfig[]) => this.addReportConfig(reportConfigs) )
		)
	}

	public addReportConfig(data:any){

		console.log('##! TODO: IMPORT REPORT')
		this.addConfig(data)
	}

	ngOnDestroy(){
		this.subscriptions.forEach ( sub => sub.unsubscribe() )
	}

}