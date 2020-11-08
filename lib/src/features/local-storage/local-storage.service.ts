import 	{ 	Injectable 			} 	from '@angular/core'

import	{	
			Item,
			ItemConfig,
			ItemStorage			
		}							from '@rcc/core'



@Injectable()
export class LocalStorageService {

	constructor() { }


	createItemStorage<C extends ItemConfig, I extends Item<C>>(id:string): ItemStorage<C, I> {

		return	{
					getAll: 	async () 				=> JSON.parse(localStorage.getItem(id))||[],
					store:		async (items: (I|C)[])	=> localStorage.setItem(id, JSON.stringify(items.map( item => (item as I).config || item )))
				}
	}
}
