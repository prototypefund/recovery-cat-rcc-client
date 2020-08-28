import	{	
			Component,
			Inject,
			Optional,
			Type,
			Input, 
			TemplateRef
		}										from '@angular/core'
import	{	MainHeaderService				}	from '../main-header.service'	



@Component({
	selector: 		'rcc-common-header',
	templateUrl: 	'./common-header.component.html',
	styleUrls: 		['./common-header.component.scss'],
})
export class CommonHeaderComponent {


	@Input()
	public fab: boolean

	public templates: TemplateRef<any>[]



	constructor(
		public mainHeaderService: MainHeaderService
	) { 

		this.templates = this.mainHeaderService.templates
	}


}
