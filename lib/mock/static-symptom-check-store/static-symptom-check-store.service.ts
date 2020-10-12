import 	{ 	Injectable 			}	from '@angular/core'

import	{	
			SymptomCheck,
			SymptomCheckConfig,
			SymptomCheckStore,
			Schedule
		}							from '@rcc/core'


@Injectable()
export class StaticSymptomCheckStore extends SymptomCheckStore {

	public readonly name = "STATIC_SYMPTOM_CHECK_STORE.NAME"

	constructor(){
		super(staticStorage)
	}
}

const staticStorage = { getAll: () => Promise.resolve(configs) }

const configs:SymptomCheckConfig[] = [
		{
			meta:		{
							source: 			'Example: Dr. Who',
							defaultSchedule:	'RRULE:FREQ=DAILY',
							start:				undefined,
							creationDate:		'2020-02-28T16:13:00.0Z'
						},
			questions:	['A', 'B', 'C']						
		},

		{
			meta:		{
							source: 			'Example: Dr. Crumpler',
							defaultSchedule:	'RRULE:FREQ=DAILY',
							start:				undefined,
							creationDate:		'2020-05-28T03:33:00.0Z',
							paused: 			false
						},
			questions:	['B', 'C']						
		},

		{
			meta:		{
							source: 			'Example: Dr. Strangelove',
							defaultSchedule:	'RRULE:FREQ=DAILY',
							start:				undefined,
							creationDate:		'2020-05-28T03:33:00.0Z',
							paused: 			false
						},
			questions:	['A','C', 'D']						
		},
	]
