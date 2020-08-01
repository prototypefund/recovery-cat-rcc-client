import	{	NgModule				}	from '@angular/core'
import	{	EntryMetaStoreModule	}	from '@rcc/features/entries/meta-store'
import	{	Journal					}	from './journal.service'

@NgModule({
	declarations: [],
	providers: [
		Journal
	],
	imports:[
		EntryMetaStoreModule.forChild([Journal])
	],
})
export class JournalModule { }
