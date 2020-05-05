import 	{ 	Injectable 			} 	from '@angular/core'

import	{	
			ItemConfig,
			ItemStorage			
		}							from '@rcc/core'


@Injectable()
export class LocalStorageService {

	constructor() { }


	createItemStorage<C extends ItemConfig>(id:string): ItemStorage<C> {

		return	{
					getAll: 	async () 				=> JSON.parse(localStorage.getItem(id))||[],
					storeAll:	async (configs: C[])	=> localStorage.setItem(id, JSON.stringify(configs))
				}
	}
}
