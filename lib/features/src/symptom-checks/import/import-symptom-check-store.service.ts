import 	{ 	
			Injectable, 
			OnDestroy			
		} 								from '@angular/core'

import	{	Router					}	from '@angular/router'

import	{	SubscriptionLike		}	from 'rxjs'
import	{	
			map,
			filter
		}								from 'rxjs/operators'

import	{
			RccAlertController,			
		}								from '@rcc/common'

import	{	
			SymptomCheck,
			SymptomCheckConfig,
			SymptomCheckStore,			
		}								from '@rcc/core'


import	{
			RccStorage,
			IncomingData
		}								from '@rcc/common'

import	{	SymptomCheckHomePath	}	from '../../symptom-checks/meta-store'



@Injectable()
export class ImportSymptomCheckStore extends SymptomCheckStore implements OnDestroy {

	public readonly name = "IMPORT_SYMPTOM_CHECK_STORE.NAME"

	private subscriptions : SubscriptionLike[] = []

	constructor(
		private incomingData		: IncomingData,
		private rccStorage			: RccStorage,
		private rccAlertController	: RccAlertController,
		private router				: Router
	){
		super(
			rccStorage.createItemStorage('rcc-import-symptom-checks'),
		)

		this.listenToIncomingData()
	}


	protected listenToIncomingData(){
		this.subscriptions.push(
			this.incomingData
			.pipe(				
				map( 	(data:any) 									=> SymptomCheck.findConfigs(data) ),
				filter(	(symptomCheckConfigs: SymptomCheckConfig[])	=> symptomCheckConfigs.length > 0)
			)
			.subscribe( this.addSymptomCheckConfig.bind(this) )
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

		await 	this.storeAll()

		await 	this.rccAlertController.present({
					header: 	'IMPORT_SYMPTOM_CHECK_STORE.SUCCESS.HEADER',
					message: 	symptom_checks.map( symptom_check => symptom_check.meta.source).join('<br/>'),
					buttons:	[
									{
										label:		'IMPORT_SYMPTOM_CHECK_STORE.SUCCESS.OKAY',
										rejectAs: 	'okay'
									},
									{
										label:		'IMPORT_SYMPTOM_CHECK_STORE.SUCCESS.GOTO',
										resolveAs: 	'goto'
									}
								]
				})
				.then(
					() => { this.router.navigate([SymptomCheckHomePath]) },
					() => {}
				)
		

		return symptom_checks

	}


	public async deleteSymptomCheck(symptom_check: SymptomCheck): Promise<any> {	
		if(!this.removeItem(symptom_check)) throw "CustomSymptomCheckStore.delete: Unable to delete symptom check with id: " + symptom_check.id

		return 	this.storeAll()
				.then( () => symptom_check)
	}


}
