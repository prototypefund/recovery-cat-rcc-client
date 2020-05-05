import 	{ 	
			NgModule,
			Injectable 			

		}					from '@angular/core'

import	{
			ItemConfig,
			ItemStorage
		}					from '@rcc/core'



class voidStore<C extends ItemConfig> {

	constructor(){
		console.warn("StorageProviderModule: using fallback voidStore; please provide alternative ItemStore." )
	}

	async getAll()				: Promise<C[]> { return [] }
	async storeAll(configs:C[])	: Promise<any> {}
}

@Injectable()
export class RccStorage {
	createItemStorage<C>(id:string):ItemStorage<C>{ 
		return new voidStore<C>()
	}
}



@NgModule({
	providers: [
		RccStorage
	]
})
export class StorageProviderModule { 

}
