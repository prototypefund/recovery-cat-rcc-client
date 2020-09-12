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

	public readonly name = "CUSTOM_SYMPTOM_CHECK_STORE.NAME"

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


	public async deleteSymptomCheck(symptom_check: SymptomCheck): Promise<any> {	
		if(!this.removeItem(symptom_check)) throw "CustomSymptomCheckStore.delete: Unable to delete symptom check with id: "+symptom_check.id

		return 	this.storeAll()
				.then( () => symptom_check)
	}
}



