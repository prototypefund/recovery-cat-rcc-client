import	{	Component		}	from '@angular/core'
import	{	DevWarnings		}	from '../dev.commons'

@Component({
	selector: 		'rcc-dev.page',
	templateUrl: 	'./dev.page.html',
	styleUrls: 		['./dev.page.scss'],
})
export class DevPage {

	constructor(
		public warnings : DevWarnings
	) { }

	ngOnInit() {}

}
