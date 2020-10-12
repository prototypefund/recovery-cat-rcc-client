import	{	
			Injectable,
			Inject, 
		}						from '@angular/core'

import	{
			ICON_MAP
		}						from './icons.commons'

@Injectable()
export class IconsService {

	constructor(
		@Inject(ICON_MAP)
		public iconMap: any
	) {}

	public get(str: string){
		if(!this.iconMap[str]) console.warn('Icon missing: '+str)
		return this.iconMap[str] || 'UNKNOWN_ICON_STRING'
	}

}
