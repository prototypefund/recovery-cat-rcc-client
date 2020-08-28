import 	{ 	
			Injectable, 
			OnDestroy
		} 							from '@angular/core'

import	{	SubscriptionLike	}	from 'rxjs'
import	{	map					}	from 'rxjs/operators'
import	{	
			SymptomCheck,
			SymptomCheckConfig,
			SymptomCheckStore,			
		}							from '@rcc/core'


import	{
			RccStorage,
			IncomingData
		}							from '@rcc/common'



@Injectable()
export class ImportSymptomCheckStore extends SymptomCheckStore implements OnDestroy {

	public readonly name = "IMPORT_SYMPTOM_CHECK_STORE.NAME"

	private subscriptions : SubscriptionLike[] = []

	constructor(
		private incomingData	: 	IncomingData,
		private rccStorage		:	RccStorage
	){
		super(
			rccStorage.createItemStorage('rcc-custom-symptom-checks'),
		)

		this.listenToIncomingData()
	}


	protected listenToIncomingData(){
		this.subscriptions.push(
			this.incomingData
			.pipe(
				map( (data:any) => {
					if(SymptomCheck.acceptsAsConfig(data))	return [data]
					if(data instanceof Array) 				return data.filter( (item:any) => SymptomCheck.acceptsAsConfig(item))
					return[]	
				})
			)
			.subscribe( (symptomCheckConfigs: SymptomCheckConfig[]) => this.addSymptomCheckConfig(symptomCheckConfigs) )
		)
	}


	ngOnDestroy(){
		this.subscriptions.forEach( sub => sub.unsubscribe() )
	}



	public async addSymptomCheckConfig(configs: SymptomCheckConfig[])	: Promise<SymptomCheck[]> 
	public async addSymptomCheckConfig(config: 	SymptomCheckConfig)		: Promise<SymptomCheck> 
	public async addSymptomCheckConfig(x: 		any)					: Promise<any> 
	{

		if(!(x instanceof Array)) return this.addSymptomCheckConfig([x]).then( arr => arr[0] )

		const symptom_checks = x.map( config => this.addConfig(config) )

		return 	this.storeAll()
				.then( () => symptom_checks)

	}


	public async removeSymptomCheck(symptom_check: SymptomCheck): Promise<any> {	
		if(!this.removeItem(symptom_check)) throw "CustomSymptomCheckStore.delete: Unable to delete symptom check with id: " + symptom_check.id

		return 	this.storeAll()
				.then( () => symptom_check)
	}



}
