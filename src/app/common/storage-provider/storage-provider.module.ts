import 	{ 	
			NgModule,
			Injectable 			

		}					from '@angular/core'

import	{
			Item,
			ItemConfig,
			ItemStorage
		}					from '@rcc/core'



class voidStore<I extends Item<C>, C extends ItemConfig> {

	constructor(){
		console.warn("StorageProviderModule: using fallback voidStore; please provide alternative ItemStore." )
	}

	async getAll()					: Promise<C[]> { return [] }
	async storeAll(items: (I|C)[])	: Promise<any> {}
}

@Injectable()
export class RccStorage {
	createItemStorage<I extends Item<C>, C extends ItemConfig>(id:string):ItemStorage<I, C> { 
		return new voidStore<I,C>()
	}
}



@NgModule({
	providers: [
		RccStorage
	]
})
export class StorageProviderModule { 

}
