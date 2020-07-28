
import 	{ 	
			Component,
			ViewChild,
			TemplateRef,
		} 									from '@angular/core'

@Component({
	template: ''
})
export class ItemLabelComponent{
	@ViewChild(TemplateRef, {static: true}) itemLabelTemplate: TemplateRef<any>

	constructor(){
		
	}

	ngAfterViewInit(){
		if(!this.itemLabelTemplate) throw "ItemLabel missing #itemLabelTemplate."
	}
}
