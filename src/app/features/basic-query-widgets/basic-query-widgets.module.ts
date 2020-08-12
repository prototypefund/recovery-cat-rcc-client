import	{	NgModule 					}	from '@angular/core'
import	{	SharedModule 				}	from '@rcc/common'
import	{	QuestionaireModule			}	from '@rcc/features/questionaire'
import	{	QueriesModule				}	from '@rcc/features/queries'
import	{	ScaleQueryWidgetComponent	}	from './scale/scale.component'

const widgets 	=	[
						ScaleQueryWidgetComponent
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
