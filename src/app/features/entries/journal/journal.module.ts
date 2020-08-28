import	{	NgModule				}	from '@angular/core'
import	{	RouterModule			}	from '@angular/router'
import	{	TranslationsModule		}	from '@rcc/common'
import	{	EntryMetaStoreModule	}	from '@rcc/features/entries/meta-store'
import	{	Journal					}	from './journal.service'

import en from './i18n/en.json'
import de from './i18n/de.json'


const itemActions 		= 	[
								{
									label: 		'DELETE',
									store: 		Journal,
									handler: 	(item: any, store: any) => store.removeEntry(item),
									icon:		'delete',
									role:		"destructive" as const
								},
{
									label: 		'VIEW',
									store: 		Journal,
									handler: 	(item: any, store: any) => {},
									icon:		'view',
									role:		"details" as const
								},

							]

@NgModule({
	imports:[
		EntryMetaStoreModule.forChild([Journal], itemActions),
		TranslationsModule.forChild("JOURNAL", {en, de})
	],
	declarations: [],
	providers: [
		Journal
	],
})
export class JournalModule { }
