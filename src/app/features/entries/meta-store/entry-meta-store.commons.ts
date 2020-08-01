import	{	InjectionToken 	}		from "@angular/core"
import 	{
			Entry,
			EntryConfig,
			ItemStore,
		}							from '@rcc/core'

import	{	ItemAction		}		from '@rcc/common'



export const ENTRY_STORES 		= new InjectionToken<ItemStore<EntryConfig, Entry>>('Entry Stores')
export const ENTRY_ACTIONS 		= new InjectionToken<ItemAction<Entry>>('ItemAction')
