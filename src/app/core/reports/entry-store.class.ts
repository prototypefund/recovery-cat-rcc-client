import 	{ 	Injectable 			} 	from '@angular/core'
import	{	
			ItemStore,
			ItemStorage
		}							from '@rcc/core/items'

import	{	adHocId				}	from '@rcc/core/utils'

import	{	
			Entry,
			EntryConfig		
		}							from './entry.class'



function identifyItemBy(item: Entry){

	if(item.id) return item.id

	return item.id = adHocId()
	
}

export class EntryStore extends ItemStore<EntryConfig, Entry>{

	constructor(
		storage: ItemStorage<EntryConfig, Entry>,
	){
		super({
			itemClass: 		Entry,
			identifyItemBy,
			storage,
		})
	}

}