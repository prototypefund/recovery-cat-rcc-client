import	{	
			Injectable,
			Type,
			TemplateRef,
			Injector,
			Optional,
			Inject,
			ComponentFactoryResolver
		}									from '@angular/core'

import	{	sortByKeyFn					}	from '@rcc/core'

import	{	
			MAIN_HEADER_CONFIG,
			MainHeaderItemConfig	
		}									from './main-header.commons'

@Injectable()
export class MainHeaderService {

	public	templates			: TemplateRef<any>[]

	constructor(
		@Optional() @Inject(MAIN_HEADER_CONFIG)
		public mainHeaderItemConfig		: MainHeaderItemConfig [],
		public injector					: Injector,
		public componentFactoryResolver	: ComponentFactoryResolver
	) { 
		this.createTemplates()
	}

	public createTemplates(){				

		console.log(this.mainHeaderItemConfig)

		this.templates =	(this.mainHeaderItemConfig || [])
							.sort(sortByKeyFn('position'))
							.map( item => {

								const component	=	(item as any).component || item

								const instance	= 	this.componentFactoryResolver
													.resolveComponentFactory( component )
													.create(this.injector)
													.instance

								return (instance as any).componentTemplate
							}) 
							
		console.log(this.templates)

	}

}	
