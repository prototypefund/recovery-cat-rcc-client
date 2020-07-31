import	{	
			Type,
			InjectionToken				
		}						from '@angular/core'

export interface Claim {
	label		: string,
	icon?		: string,
	import		: (...args:any) => any	
}

export interface DataClaimConfig {
	dependencies?	: 		Type<any>[],
	checkClaim		:		(data:any, ...dependencies:any[])	=> Claim|null,
}

export const DATA_IMPORT_CALLBACK = new InjectionToken<DataClaimConfig>("Callback config.")