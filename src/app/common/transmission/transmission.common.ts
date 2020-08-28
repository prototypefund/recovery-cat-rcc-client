import	{	InjectionToken			}	from '@angular/core'


export interface RccTransmission {
	send	: (data: any) => Promise<any>
	meta	: any
}



export abstract class AbstractTransmissionService {

	public claimsAsConfig(data:any){
		return false
	}

	abstract async setup()				: Promise<RccTransmission>
	abstract async receive(meta:any)	: Promise<any>

}

export const TRANSMISSION_SERVICE = new InjectionToken<AbstractTransmissionService>('Some transmission service')

