import 	{ 
			Pipe, 
			PipeTransform,
			ComponentRef,
			Injector,
			ReflectiveInjector
		}								from '@angular/core'

import	{	Query 					}	from '../query.class'
import	{	QueryWidgetsService		}	from './query-widgets.service'
import	{	QueryWidget				}	from './query-widgets.commons'





@Pipe({
	name: 'bestWidgetMatch'
})
export class BestWidgetMatchPipe implements PipeTransform {

	constructor(private queryWidgetsService: QueryWidgetsService){}

	transform(query: Query): QueryWidget{		
		return 	this.queryWidgetsService.getBestWidgetMatch(query.question)[0]
	}
}




@Pipe({
	name: 'injectQuery'
})
export class InjectQueryPipe implements PipeTransform {

	constructor(private injector: Injector){}

	transform(query:Query): Injector { 
		return 	Injector.create({
					providers: 	[
									{
										provide: 	Query, 
										useValue: 	query
									}
								], 
					parent:		this.injector
				}) 
	}

}
