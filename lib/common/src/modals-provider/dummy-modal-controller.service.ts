import 	{ 	
			Injectable,
			Type,
		}					from '@angular/core'


@Injectable()
export class RccModalController {
	 
	//Should return whatever data is passed into dismiss: 
	public async present(component: Type<any>, data: any): Promise<any> {		
		return this.dismiss()
	}

	public dismiss(data? : any){
		console.warn("ModalProviderModule: missing ModalProvider, please provide alternative modalControllerClass extending RccModalController." )
	}

}

