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
		public dataclaimConfigs	: DataClaimConfig[],
		public injector			: Injector
	) {}

	public announce(data:any): null|void {
		//TODO multi		

		if(!this.dataclaimConfigs || this.dataclaimConfigs.length == 0) return null

		let	claims: any[] = []

		this.dataclaimConfigs.forEach( (claimConfig : DataClaimConfig, index:number) => {

			const dependencies 	= (claimConfig.dependencies ||[]).map( (dep:any) => this.injector.get(dep) ) 
			const claim			= claimConfig.checkClaim(data, ...dependencies)

			if(claim) claims.push(claim)

		})

		claims.forEach( claim => {
			claim.import() //TODO multiple competing claims!
		})
	}

}
