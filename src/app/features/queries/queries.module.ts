import 	{	
			NgModule,
			ModuleWithProviders, 
			Type,
			Inject,
			Optional,
			Component
		} 								from '@angular/core'

import	{	RouterModule			}	from '@angular/router'


import	{	SharedModule			}	from '@rcc/common'

import	{	QuestionaireModule		}	from '@rcc/features/questions'
import	{	JournalModule			}	from '@rcc/features/entries'

import	{	QueryPage				}	from './query.page/query.page'
import	{	Pagination				}	from './query-run-page/pagination/pagination.component'
import	{	QueryRunPage			}	from './query-run-page/query-run-page.component'
import	{	QueryRunService			}	from './query-run.service'
import	{	
			QUERY_WIDGETS,
			QueryWidget,
			BestWidgetMatchPipe,
			InjectQueryPipe,
			QueryWidgetComponent,
			QueryWidgetsService		
		}								from './query-widgets'


const routes 		=	[
							{ 
								path: 		'query/:id',	
								component: 	QueryPage 
							},
							{
								path:		'query-run',
								component:	QueryRunPage
							}
						]

const actions		=	[
							{ 	
								label: 		'QUERIES.ACTION', 
								icon: 		'fill',
								path:		'query/:id'
							}
						]


@NgModule({

	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		QuestionaireModule.forChild(null, actions),
		JournalModule,
	],

	declarations: [
		BestWidgetMatchPipe,
		InjectQueryPipe,
		QueryPage,
		QueryWidgetComponent,
		QueryRunPage,
		Pagination,
	],

	providers: [
		QueryRunService, 
		QueryWidgetsService,
	],

	exports:[
		QueryRunPage,
		Pagination
	]

})
export class QueriesModule {

	static forChild(widgets: QueryWidget[]): ModuleWithProviders<QueriesModule> {
		return {
			ngModule: 	QueriesModule,
			providers:	[
							...(widgets||[]).map( widget => ({ provide: QUERY_WIDGETS, useValue: widget, multi: true })),							
						]
		}
	}
}


