import 	{	Injectable 				} 	from '@angular/core'
import	{	Observable				}	from 'rxjs'


@Injectable()
export class ConnectionService {

	public 	statusChange$			: Observable<string>	
	public	message$				: Observable<any>

	open(){

	}

	listen(){

	}

	close(){

	}

	complete(){

	}

}
