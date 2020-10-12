import 	{ 	
			Injectable, 
			InjectionToken,
			Inject
		} 							from '@angular/core'

import	{	
			Question, 
			QuestionConfig,
			ItemStore
		}							from '@rcc/core'


import	{	DevWarnings			}	from './dev.commons'


@Injectable()
export class DevService {

	constructor(
		public warnings: DevWarnings
	){}

	addWarning(name: string, note: string){
		this.warnings.push({name,note})
	}

}

