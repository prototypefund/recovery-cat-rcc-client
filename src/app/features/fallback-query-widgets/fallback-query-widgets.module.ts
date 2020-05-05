import 	{	
			NgModule,
			Inject,
			ModuleWithProviders
			//ComponentFactoryResolver
		}											from '@angular/core'

import	{	QueriesModule						}	from '@rcc/features/queries'
import 	{	ReactiveFormsModule 				} 	from '@angular/forms'
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
		ReactiveFormsModule,
		QueriesModule.forChild(queryWidgets)
	],
	declarations:[		
		...queryWidgets
	],
})
export class FallbackQueryWidgetsModule {}

