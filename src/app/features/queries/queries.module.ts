import 	{	
			NgModule,
			ModuleWithProviders, 
		} 								from '@angular/core'

import 	{	CommonModule 			}	from '@angular/common'
import	{	RouterModule			}	from '@angular/router'


import	{	SharedModule			}	from '@rcc/common'

import	{	
			QUERY_WIDGETS,
			QueryWidget		
		}								from './query-widgets.commons'

import	{
			BestWidgetMatchPipe,
			InjectQueryPipe
		}								from './query-widget.pipes'

import	{
			QueryPage
		}								from './query.page/query.page'

import	{
			QueryWidgetComponent
		}								from './query-widget/query-widget.component'


import	{	QueryWidgetsService		}	from './query-widgets.service'

const routes 		=	[
							{ path: 'query/:id',	component: QueryPage },
						]




@NgModule({

	imports: [
		SharedModule,
		RouterModule.forChild(routes)
	],

	declarations: [
		BestWidgetMatchPipe,
		InjectQueryPipe,
		QueryPage,
		QueryWidgetComponent
	],

	providers: [
		QueryWidgetsService
	],

})
export class QueriesModule {

	static forChild(widgets: QueryWidget[]): ModuleWithProviders{
		return {
			ngModule: 	QueriesModule,
			providers:	widgets.map( widget => ({ provide: QUERY_WIDGETS, useValue: widget, multi: true }))
		}
	}
}


