import	{	NgModule 					}	from '@angular/core'
import	{	SharedModule 				}	from '@rcc/common'
import	{	QueriesModule				}	from '@rcc/features/queries'
import	{	QuestionaireModule			}	from '@rcc/features/questions'
import	{	ScaleQueryWidgetComponent	}	from './scale/scale.component'
import	{	SelectQueryWidgetComponent	}	from './select/select.component'
import	{	BooleanQueryWidgetComponent	}	from './boolean/boolean.component'

const widgets 	=	[
						ScaleQueryWidgetComponent,
						SelectQueryWidgetComponent,
						BooleanQueryWidgetComponent
					]

@NgModule({
	imports: [
		SharedModule,
		QuestionaireModule,
		QueriesModule.forChild(widgets),
	],
	declarations: [
		...widgets
	],
	exports: [
		...widgets
	]
})
export class BasicQueryWidgetsModule { }
