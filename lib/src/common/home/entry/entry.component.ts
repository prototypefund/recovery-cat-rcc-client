import 	{	
			Component,
			Input			
		}							from '@angular/core'
import	{	HomePageEntryConfig	}	from '../home.entries'

@Component({
	selector:		'rcc-home-page-entry',
	templateUrl: 	'entry.component.html',
})
export class HomePageEntryComponent {
	@Input() config: HomePageEntryConfig
}


