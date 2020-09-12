import 	{	NgModule 						} 	from '@angular/core'
import	{	DevModule						}	from '@rcc/common/dev'
import	{	DebugService					}	from './debug.service'


@NgModule({
	providers:[
		DebugService
	],
	imports: [
		DevModule.note('DebugModule'),
	]
})
export class DebugModule{
	constructor(
		debugService: DebugService
	){}
}
