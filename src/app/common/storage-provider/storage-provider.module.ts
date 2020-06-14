import 	{ 	
			NgModule,
			Injectable 			

		}					from '@angular/core'

import	{
			Item,
			ItemConfig,
			ItemStorage
		}					from '@rcc/core'



class voidStore<C extends ItemConfig, I extends Item<C>> {

	constructor(){
		console.warn("StorageProviderModule: using fallback voidStore; please provide alternative ItemStore." )
	}

	async getAll()					: Promise<C[]> { return [] }
	async storeAll(items: (I|C)[])	: Promise<any> {}
}

@Injectable()
export class RccStorage {
	createItemStorage<C extends ItemConfig, I extends Item<C>>(id:string):ItemStorage<C, I> { 
		return new voidStore<C,I>()
	}
}



@NgModule({
	providers: [
		RccStorage
	]
})
export class StorageProviderModule { 

}
