import	{	InjectionToken			}	from '@angular/core'

export interface RccTransmission {

	send	: (data: any) => Promise<any>
	meta	: any
}

export interface RccTransmissionService {

	open	: (config:any) => RccTransmission
	read	: (config:any) => Promise<any>

}

export const TRANSMISSION_SERVICE = new InjectionToken<RccTransmissionService>('Some transmission service')