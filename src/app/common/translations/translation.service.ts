import	{	Injectable			} from '@angular/core'

import 	{	TranslocoService	} from '@ngneat/transloco'


@Injectable()
export class RccTranslationService {

	constructor(private translocoService: TranslocoService ){}

	public translate(str: string){
		return this.translocoService.translate(str)
	}

}



