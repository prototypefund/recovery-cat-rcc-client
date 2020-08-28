import	{	
			Type,
			Provider
		}								from '@angular/core'


export interface Factory<T> {
	deps:		Type<any>[],
	factory:	(...args:any[]) => T
}

// export type ProductOrFactory<T> = Partial<T> & Partial<Factory<T>>

export function isFactory(x:any) : x is Factory<any> {
	return (x.deps instanceof Array) && (typeof x.factory == 'function')
}

export function getProvider<T>(token: any, x : T | Factory<T>, multi: boolean = false): Provider {

	return	isFactory(x)
			?	{
					provide: 	token,
					deps:		x.deps,
					useFactory:	x.factory,
					multi:		true
				}

			:	{
					provide:	token,
					useValue:	x,
					multi:		true
				}

}

export function getMultiProvider<T>(token: any, x : T | Factory<T>){
	return getProvider<T>(token, x, true)
}