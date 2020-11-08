import	{	
			NgModule,
			Component				
		}									from '@angular/core'
import	{	
			TranslationsModule,
			HomePageModule,
			MainMenuModule,
			SharedModule
		}									from '@rcc/common'

import	{	EntryShareService			}	from './entry-share.service'

import en from './i18n/en.json'
import de from './i18n/de.json'


@Component({
	template:	`
					<ion-item 
						[button]	= "true"
						(click) 	= "EntryShareService.share()"						
					>
						<ion-label>{{ "ENTRY_SHARE.MENU_ENTRY" | translate }}</ion-label>
						<ion-icon [name] = "'share' | rccIcon" slot = "end"></ion-icon>
					</ion-item>
				`,
	providers: [EntryShareService]
})
export class EntryShareMenuEntry {
	constructor(public EntryShareService: EntryShareService){}
}



const mainMenuEntries	=	[
								{
									position:	4,	
									component:  EntryShareMenuEntry
								}
							]

const homePageEntries	=	[
								{
									deps:		[EntryShareService],
									factory:	(EntryShareService:EntryShareService) => ({										
													position:		3,
													label:			'ENTRY_SHARE.HOME_ENTRY.LABEL',
													icon:			'share',
													description:	'ENTRY_SHARE.HOME_ENTRY.DESCRIPTION',
													action:			() => EntryShareService.share()
												})
								}
							]

@NgModule({
	imports: [
		SharedModule,
		TranslationsModule.forChild("ENTRY_SHARE", {en,de}),
		MainMenuModule.forChild(mainMenuEntries),
		HomePageModule.forChild(homePageEntries)
	],
	providers: [
		EntryShareService
	],
	declarations: [
		EntryShareMenuEntry
	]
})
export class EntryShareModule { }
