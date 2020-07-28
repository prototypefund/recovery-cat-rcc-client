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

	public claim(data:any){
		return	Report.checkConfig(data)
				?	{
						label: 	'IMPORTED_REPORT_STORE.CLAIM',
						icon:	'report'					

					}
				:	null
	}

	public import(data:any){
		this.addConfig(data)
	}

}