import 	{ 	Injectable } 		from '@angular/core'

import	{	
			SymptomCheck,
			SymptomCheckConfig,
			SymptomCheckStore
		}						from '@rcc/core'




@Injectable()
export class StaticSymptomCheckStore extends SymptomCheckStore {

	public readonly name = "StaticSymptomCheckStore"

	constructor(){
		super(staticStorage)
	}
}

const staticStorage = { getAll: () => Promise.resolve(configs) }

const configs:SymptomCheckConfig[] = [
		{
			meta:		{
							source: 			'Static exmaple symptom check 1',
							defaultSchedule:	undefined,
							start:				undefined,
							creationDate:		'2020-02-28T16:13:00.0Z'
						},
			questions:	['A', 'B', 'C']						
		},

		{
			meta:		{
							source: 			'Static exmaple symptom check 2',
							defaultSchedule:	undefined,
							start:				'2020-06-01T00:00:00.0Z',
							creationDate:		'2020-05-28T03:33:00.0Z',
							paused: 			true
						},
			questions:	['B', 'C', 'D']						
		},

		{
			meta:		{
							source: 			'SymptomCheck with missing question',
							defaultSchedule:	undefined,
							start:				'2020-06-01T00:00:00.0Z',
							creationDate:		'2020-05-28T03:33:00.0Z',
							paused: 			true
						},
			questions:	['B', 'C', 'D', 'XX']						
		},
	]
