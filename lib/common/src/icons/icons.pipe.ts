import	{
			Pipe, 
			PipeTransform 
		}						from '@angular/core'

import	{
			IconsService
		}						from './icons.service'

@Pipe({ name: 'rccIcon' })
export class RccIconPipe implements PipeTransform {


	constructor( public iconsService: IconsService ){}

	transform(icon_name: string = '') {
		return this.iconsService.get(icon_name)
	}
}