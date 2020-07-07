import 	{ 	Injectable } 		from '@angular/core'

import	{	
			SymptomCheck,
			SymptomCheckConfig,
			SymptomCheckStore
		}						from '@rcc/core'


import	{
			RccStorage
		}						from '@rcc/common'



@Injectable()
export class CustomSymptomCheckStore extends SymptomCheckStore {

	public readonly name = "CustomSymptomCheckStore"

	constructor(
		rccStorage:	RccStorage
	){
		super(
			rccStorage.createItemStorage('rcc-custom-symptom-checks'),
		)

	}




	public async addSymptomCheckConfig(config: SymptomCheckConfig): Promise<any> {

		const symptom_check = this.addConfig(config)

		return 	this.storeAll()
				.then( () => symptom_check)

	}




	public async delete(symptom_check: SymptomCheck): Promise<any> {	
		const id = this.identifyItem(symptom_check)
		if(!this.map.get(id)) throw "CustomSymptomCheckStore.delete: Unable to find symptom check with id: "+id

		this.map.delete(id)
		return this.storeAll()
	}
}



