
import	{	Component				}	from '@angular/core'
import	{	NotificationService		}	from '@rcc/common'

@Component({
	template: "{{'DUE_QUESTIONS.DESCRIPTION' | translate : {count: (notificationService.notification$ | async) } }}",
	providers: [NotificationService]
})
export class DueQuestionsHomePageEntry{
	constructor(public notificationService: NotificationService){}
}