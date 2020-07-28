import	{	
			Type,
			InjectionToken				
		}						from '@angular/core'

export interface claim {
	label		: string,
	icon?		: string	
}

export interface DataClaimConfig {
	dependencies?	: 		Type<any>[],
	claim			:		(data:any, ...dependencies:any[])	=> claim|null,
	import			:		(data:any, ...dependencies:any[]) 	=> any
}

export const DATA_IMPORT_CALLBACK = new InjectionToken<DataClaimConfig>("Callback config.")