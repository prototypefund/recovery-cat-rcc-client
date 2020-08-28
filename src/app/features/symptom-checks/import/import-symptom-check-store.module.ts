import	{ 
			NgModule 
		} 									from '@angular/core'

import	{	IncomingDataModule			}	from '@rcc/common'
import	{	ImportSymptomCheckStore		}	from './import-symptom-check-store.service'
import	{	SymptomCheckMetaStoreModule	}	from '../meta-store'

@NgModule({
	providers: [
		ImportSymptomCheckStore
	],
	declarations: [

	],
	imports: [
		SymptomCheckMetaStoreModule.forChild([ImportSymptomCheckStore]),
		IncomingDataModule
	]
})
export class ImportSymptomCheckStoreModule { }
