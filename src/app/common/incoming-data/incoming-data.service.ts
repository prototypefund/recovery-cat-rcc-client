import	{	
			Injectable,
			Optional,
			Inject,
			Injector

		} 								from '@angular/core'
import	{	
			DataClaimConfig,
			DATA_IMPORT_CALLBACK	
		} 								from './incoming-data.commons'

@Injectable()
export class IncomingData {

	constructor(
		@Optional() @Inject(DATA_IMPORT_CALLBACK)
		public callbackConfigs	: DataClaimConfig[],
		public injector			: Injector
	) {}

	public announce(data:any): null|void {
		//TODO multi				
		if(!this.callbackConfigs || this.callbackConfigs.length == 0) return null

		let	claims: any[] = []

		this.callbackConfigs.forEach( (claimConfig : DataClaimConfig, index:number) => {

			const dependencies 	= (claimConfig.dependencies ||[]).map( (dep:any) => this.injector.get(dep) ) 
			const claim			= claimConfig.claim(data, ...dependencies)

			if(claim) claims.push({
				...claim,
				callback:	() => claimConfig.import(data, ...dependencies)
			})

		})

		claims.forEach( claim => {
			claim.callback() //TODO multiple competing claims!
		})
	}

}
