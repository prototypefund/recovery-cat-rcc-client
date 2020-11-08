import	{
			Component, 
		}								from '@angular/core'

import	{	SettingsService			}	from '../settings.service'

@Component({
	selector: 		'rcc-overview-page',
	templateUrl: 	'./overview-page.component.html',
	styleUrls: 		['./overview-page.component.scss'],
})
export class OverviewPageComponent {

	public settings : any[]

	constructor(
		settingsService : SettingsService
	){
		this.settings = settingsService.settings		

	}

}
