import 	{ 	Injectable	}	from '@angular/core'




export interface AlertConfig {
	cssClass?	: string,
	header?		: string,
	subHeader?	: string,
	message?	: string,
	buttons?	: ButtonConfig[]
}

export interface ResolveButtonConfig {	
	label		: string
	resolveAs	: any
	rejectAs?	: never
}

export interface RejectButtonConfig  {	
	label		: string
	resolveAs?	: never
	rejectAs	: any
}



export type ButtonConfig = ResolveButtonConfig|RejectButtonConfig


@Injectable()
export class RccAlertController {

	//should reject or resolve with repesctive value from buttons
	public async present( config: AlertConfig): Promise<any> {
		let msg = "ModalProviderModule: missing AlertProvider, please provide alternative alertControllerClass extenting RccAlertController."
		console.warn(msg)
		return Promise.reject(msg)
	}

}



