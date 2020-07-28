import 	{ 	Injectable	}	from '@angular/core'


export interface ToastConfig {
	message	: string
	color?	: string 		//primary, secondary, tertiary, light, medium, dark, success, warning, danger
}

@Injectable()
export class RccToastController {

	public async present( config: ToastConfig): Promise<any> {
		let msg = "ModalProviderModule: missing ToastProvider, please provide alternative toastControllerClass extenting RccToastController."
		console.warn(msg)
		throw msg
	}

	public async success (message: string): Promise<any>{
		return await this.present({message: message, color: 'success'})
	}

	public async failure (message: string): Promise<any>{
		return await this.present({message: message, color: 'warning'})
	}

	public async info (message: string): Promise<any>{
		return await this.present({message: message, color: 'info'})
	}
}



