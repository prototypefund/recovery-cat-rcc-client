import 	{	NgModule 						} 	from '@angular/core'
import	{	
			DevModule,	
			TranslationsModule			
		}										from '@rcc/common'

import	{	
			EntryMetaStoreModule,
		}										from '@rcc/features/entries/meta-store'

import	{	StaticEntryStore				}	from './static-entry-store.service'


import en from './i18n/en.json'
import de from './i18n/de.json'

@NgModule({
	imports: [
		EntryMetaStoreModule.forChild([StaticEntryStore]),
		DevModule.note('StaticEntryStoreModule'),
		TranslationsModule.forChild("STATIC_ENTRY_STORE", {en, de})
	],
	providers: [
		StaticEntryStore
	]
})
export class StaticEntryStoreModule{}
