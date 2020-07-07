import	{ 
			Component, 
			Input,
			OnInit
		}							from '@angular/core'

import	{
			FormControl,
			FormArray,
			FormGroup,
		}							from '@angular/forms'

import	{
			merge
		}							from 'rxjs'

import	{
			Schedule
		}							from '@rcc/core'

import	{
			RccModalController
		}							from '@rcc/common'


@Component({
	selector: 		'rcc-schedule-modal',
	templateUrl: 	'./schedule.modal.html',
	styleUrls: 		['./schedule.modal.scss'],
})
export class ScheduleModal implements OnInit{

	@Input()
	schedule: Schedule

	public 	frequency			= 	new FormControl('daily')
	public 	manual				= 	new FormControl(false)
	public 	manualInput			= 	new FormControl('')
	public 	dummy_schedule 		= 	new Schedule()
	public 	restrict_to_days	= 	new FormControl(false)
	public 	dayControls			= 	[
										new FormControl(false),
										new FormControl(false),
										new FormControl(false),
										new FormControl(false),
										new FormControl(false),
										new FormControl(false),
										new FormControl(false)
									]
	


	private subscription : any

	constructor(
		public rccModalController : RccModalController
	){}

	
	ngOnInit(){
		
		this.clean()

		this.subscription = merge(
								this.frequency.valueChanges,
								this.restrict_to_days.valueChanges,
								...this.dayControls.map( control => control.valueChanges )
							)
							.subscribe( (mode: string) =>{
								this.update()
							})

		
	}

	ngOnDestroy(){
		this.subscription.unsubscribe()
	}

	update(){
		let rrule = ''

		switch(this.frequency.value){
			case 'daily': 	rrule += 'RRULE:FREQ=DAILY'
			break

			case 'weekly':	rrule += 'RRULE:FREQ=WEEKLY'
			break
		}


		if(this.frequency.value != 'daily' && this.restrict_to_days.value) {

			const days: string[] =	['mo', 'tu', 'we', 'th', 'fr', 'sa', 'su']
									.filter( (day:string, index: number ) => this.dayControls[index].value)

			

			if(days.length > 0)	rrule+=(';BYDAY='+days.join(',')).toUpperCase()

		}


		this.dummy_schedule.set(rrule)	
	}

	clean(){
		this.dummy_schedule.set(this.schedule.toString()) 	//TODO options
		this.manualInput.setValue(this.schedule.toString()) //TODO options
	}

	cancel(){
		this.rccModalController.dismiss(null)
	}

	accept(){		
		this.rccModalController.dismiss(this.dummy_schedule)
	}


}
