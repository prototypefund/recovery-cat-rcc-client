import	{	Observable			}	from 'rxjs'

export abstract class RccAbstractConnection {

	public messages$	: Observable<object | string>
	public status		: Observable<string>

	public abstract constructor(config:any){

	}

	public abstract async open(config: any)				: Promise<any>

	public abstract async close(config: any)			: Promise<any>

	public abstract async listen(config:any)			: Promise<any>

	public abstract async send(messgage: object|string)	: Promise<any>

	public abstract async complete(config:any)			: Promise<any>


}