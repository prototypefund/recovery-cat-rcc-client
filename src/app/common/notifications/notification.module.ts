import	{	
			NgModule,
			ModuleWithProviders
		}								from '@angular/core'

import	{	
			NOTIFICATION_COUNTERS,
			NotificationConfig,
			NotificationService
		}								from './notification.service'



@NgModule({
  providers: [
  	NotificationService
  ]
})
export class NotificationModule { 

	static forChild(notificationConfigs: NotificationConfig[]): ModuleWithProviders<NotificationModule> {

		return 	{
					ngModule:	NotificationModule,
					providers:	[
									...notificationConfigs.map( notificationConfig => ({
										provide: 	NOTIFICATION_COUNTERS,
										multi:		true,
										deps:		notificationConfig.deps,
										useFactory:	notificationConfig.factory
									}))
								]
				}
	}
}
