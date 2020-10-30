import 	{	
			NgModule,
			Inject,
			ModuleWithProviders
		}											from '@angular/core'
import 	{	ReactiveFormsModule 				} 	from '@angular/forms'

import	{	QueriesModule						}	from '../queries'
import	{	QuestionaireModule					}	from '../questions'
import 	{ 	SharedModule						} 	from '@rcc/common'

import	{	FallbackQueryWidgetComponent 		}	from './fallback-query-widget.component'
import	{	FallbackQueryWidgetUnknownComponent }	from './fallback-query-widget-unknown.component'


const queryWidgets = 	[	
							FallbackQueryWidgetComponent,
							FallbackQueryWidgetUnknownComponent
						]



@NgModule({
	imports: [
		SharedModule,
		QuestionaireModule,
		QueriesModule.forChild(queryWidgets),
	],
	declarations:[		
		...queryWidgets
	],
	exports: [
		...queryWidgets
	]
})
export class FallbackQueryWidgetsModule {}

