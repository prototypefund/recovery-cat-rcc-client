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

import	{	QueryPage				}	from './query.page/query.page'
import	{	
			QUERY_WIDGETS,
			QueryWidget,
			BestWidgetMatchPipe,
			InjectQueryPipe,
			QueryWidgetComponent,
			QueryWidgetsService		
		}								from './query-widgets'

import	{	ReportingService		}	from './reporting/reporting.service'

const routes 		=	[
							{ 
								path: 		'query/:id',	
								component: 	QueryPage 
							},
						]

const actions		=	[
							{ 	
								label: 		'QUERIES.ACTION', 
								icon: 		'create-outline',
								path:		'query/:id'
							}
						]



@NgModule({

	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		QuestionaireModule.forChild(null, actions)
	],

	declarations: [
		BestWidgetMatchPipe,
		InjectQueryPipe,
		QueryPage,
		QueryWidgetComponent
	],

	providers: [
		QueryWidgetsService,
		ReportingService
	],

})
export class QueriesModule {

	static forChild(widgets: QueryWidget[]): ModuleWithProviders {
		return {
			ngModule: 	QueriesModule,
			providers:	[
							...(widgets||[]).map( widget => ({ provide: QUERY_WIDGETS, useValue: widget, multi: true })),							
						]
		}
	}
}


