import	{
			Pipe, 
			PipeTransform 
		}						from '@angular/core'


@Pipe({ name: 'console' })
export class ConsolePipe implements PipeTransform {

	transform(x: any, replace?:any) {
		console.group('DevModule')
		console.log(typeof x, x.constructor.name)
		console.log(x)
		console.groupEnd()
		return 	replace !== undefined
				?	replace
				:	x
	}
}