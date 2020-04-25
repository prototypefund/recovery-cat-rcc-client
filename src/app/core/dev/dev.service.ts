import 	{ 	
			Injectable, 
			InjectionToken,
			Inject
		} 							from '@angular/core'

import	{	
			Question, 
			QuestionConfig,
			ItemStore
		}							from 'app/rcc'


import	{	DevWarnings			}	from './dev.commons'


@Injectable()
export class DevService {

	constructor(
		public warnings: DevWarnings
	){
		console.log(this.warnings)
	}

	addWarning(name: string, note: string){
		this.warnings.push({name,note})
	}

}

