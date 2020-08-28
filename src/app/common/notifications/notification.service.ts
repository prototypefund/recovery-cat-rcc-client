import	{	
			Injectable,
			InjectionToken,
			Inject,
			Optional,
			Type	
		}							from '@angular/core'

import	{	
			Subject,
			Observable,
			combineLatest				
		}							from 'rxjs'

import	{	map					}	from 'rxjs/operators'


export interface NotificationConfig {
	deps:		Type<any>[],
	factory: 	(...args:any[]) =>  Observable<number>
}


export const NOTIFICATION_COUNTERS = new InjectionToken<NotificationConfig>("Function to return a number of notications, 0 for none")


@Injectable()
export class NotificationService {

	public	notification$	: Observable<number>

	constructor(
		@Optional() @Inject(NOTIFICATION_COUNTERS)
		public notificationObs: Observable<number>[]
	) {
		this.notification$ 	= 	combineLatest(notificationObs)
								.pipe(
									map( results => results.reduce( (sum, value) => sum + value ,0) )
								)

	}

}
