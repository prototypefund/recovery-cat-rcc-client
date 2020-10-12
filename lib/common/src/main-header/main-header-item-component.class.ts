
import 	{ 	
			Component,
			ViewChild,
			TemplateRef,
		} 									from '@angular/core'

@Component({
	template: ''
})
export class MainHeaderItemComponent{
	@ViewChild(TemplateRef, {static: true}) 
	public componentTemplate: TemplateRef<any>

	ngAfterViewInit(){
		if(!this.componentTemplate) throw "ComponentTemplate missing."
	}
}
