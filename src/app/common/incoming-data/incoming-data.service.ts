import	{	Injectable					}	from '@angular/core'
import	{	Subject						}	from 'rxjs'


@Injectable()
export class IncomingData extends Subject<any> {}
