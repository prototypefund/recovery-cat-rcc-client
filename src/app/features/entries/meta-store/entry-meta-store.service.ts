import 	{	
			Injectable,
			Inject,
			Optional
		} 								from '@angular/core'


import	{	
			MetaStore,
			ItemAction,
			MetaAction			
		}								from '@rcc/common'

import	{	
			Entry,
			EntryConfig,
			EntryStore
		}								from '@rcc/core'

import	{	
			ENTRY_STORES,
			ENTRY_ACTIONS,
			ENTRY_META_ACTIONS
		}								from './entry-meta-store.commons'

@Injectable()
export class EntryMetaStore extends MetaStore<EntryConfig, Entry, EntryStore>{

	public readonly name = "ENTRIES_META_STORE.NAME"

	constructor(
		@Optional() @Inject(ENTRY_STORES) 
		stores		: EntryStore[],

		@Optional() @Inject(ENTRY_ACTIONS) 
		itemActions	: ItemAction<Entry>[],

		@Optional() @Inject(ENTRY_META_ACTIONS) 
		metaActions	: MetaAction<Entry>[]

	) {
		super(stores, itemActions, metaActions)				
	}
}
