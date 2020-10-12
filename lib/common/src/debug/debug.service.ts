import	{	
			Injectable,
			OnDestroy
		}								from '@angular/core'
import	{	SubscriptionLike		}	from 'rxjs'
import	{	IncomingData			}	from '@rcc/common/incoming-data'


@Injectable()
export class DebugService implements OnDestroy{

	public	subscriptions	: SubscriptionLike[] = []

	constructor(
		public incomingData			: IncomingData
	) { 

		console.info("DebugModule running.")

		this.subscriptions.push(
			this.incomingData.subscribe( data => {
				console.group('IncomingData')
				console.info('IncomingData:')
				console.log(data)
				console.groupEnd()
			})
		)

	}



	ngOnDestroy(){
		this.subscriptions.forEach( sub => sub.unsubscribe() )
	}
}
