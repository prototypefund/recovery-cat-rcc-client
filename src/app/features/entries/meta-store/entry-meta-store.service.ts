import 	{	
			Injectable,
			Inject,
			Optional
		} 								from '@angular/core'


import	{	
			MetaStore,
			ItemAction			
		}								from '@rcc/common'

import	{	
			Entry,
			EntryConfig,
			EntryStore
		}								from '@rcc/core'

import	{	
			ENTRY_STORES,
			ENTRY_ACTIONS
		}								from './entry-meta-store.commons'

@Injectable()
export class EntryMetaStore extends MetaStore<EntryConfig, Entry, EntryStore>{

	constructor(
		@Optional() @Inject(ENTRY_STORES) 
		stores		: EntryStore[],

		@Optional() @Inject(ENTRY_ACTIONS) 
		itemActions	: ItemAction<Entry>[]
	) {
		super(stores, itemActions)				
	}
}
