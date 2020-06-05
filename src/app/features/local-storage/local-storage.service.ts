import 	{ 	Injectable 			} 	from '@angular/core'

import	{	
			Item,
			ItemConfig,
			ItemStorage			
		}							from '@rcc/core'



@Injectable()
export class LocalStorageService {

	constructor() { }


	createItemStorage<I extends Item<C>, C extends ItemConfig>(id:string): ItemStorage<I, C> {

		return	{
					getAll: 	async () 				=> JSON.parse(localStorage.getItem(id))||[],
					store:		async (items: (I|C)[])	=> localStorage.setItem(id, JSON.stringify(items.map( item => (item as I).config || item )))
				}
	}
}
