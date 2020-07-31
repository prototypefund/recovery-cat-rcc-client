import	{	Injectable				}	from '@angular/core'
import 	{	
			ReportStore,
			Report				
		}								from '@rcc/core'


const noStorage = { getAll: () => Promise.resolve([]) }


@Injectable()
export class ReportImportStore extends ReportStore {

	constructor(){
		super(noStorage)
	}

	public checkClaim(data:any){
		return	Report.checkConfig(data)
				?	{
						label: 	'IMPORTED_REPORT_STORE.CLAIM',
						icon:	'report',					
						import:	() => this.import(data)
					}
				:	null
	}

	public import(data:any){
		this.addConfig(data)
	}

}