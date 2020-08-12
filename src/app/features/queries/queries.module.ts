import 	{	
			NgModule,
			ModuleWithProviders, 
			Type,
			Inject,
			Optional
		} 								from '@angular/core'

import 	{	CommonModule 			}	from '@angular/common'
import	{	RouterModule			}	from '@angular/router'


import	{	SharedModule			}	from '@rcc/common'

import	{	QuestionaireModule		}	from '@rcc/features/questionaire'
import	{	JournalModule			}	from '@rcc/features/entries'

import	{	QueryPage				}	from './query.page/query.page'
import	{	Pagination				}	from './query-run/pagination/pagination.component'
import	{	QueryRunComponent		}	from './query-run/query-run.component'
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
		JournalModule
	],

	declarations: [
		BestWidgetMatchPipe,
		InjectQueryPipe,
		QueryPage,
		QueryWidgetComponent,
		QueryRunComponent,
		Pagination
	],

	providers: [
		QueryWidgetsService,
	],

	exports:[
		QueryRunComponent,
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


