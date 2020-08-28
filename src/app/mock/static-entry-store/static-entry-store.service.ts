import 	{ 	Injectable 			}	from '@angular/core'

import	{	
			Entry,
			EntryConfig,
			EntryStore,
			Schedule
		}							from '@rcc/core'


@Injectable()
export class StaticEntryStore extends EntryStore {

	public readonly name = "STATIC_ENTRY_STORE.NAME"

	constructor(){
		super(staticStorage)
	}
}

const staticStorage = { getAll: () => Promise.resolve(configs) }


function getPastDate(days_ago:number):string{


	const date = new Date( Date.now() - (1000 * 60 * 60 * 24 * days_ago) )

	return Schedule.localToString(date)
}



function randomWalk(max : number = 1000):number[] {

	let random_walk: number[] = []

	for(var i = 0; i < max; i++){
		random_walk[i] = i == 0 ? (0.25+Math.random()/2) : (random_walk[i-1] + ( (Math.random()-Math.random()) / 5))

		random_walk[i] = Math.max(random_walk[i], 0)
		random_walk[i] = Math.min(random_walk[i], 0.999999999)

		if(i != 0 ){
			random_walk[i] = (random_walk[i] +random_walk[i-1])/2
		}
	}

	return random_walk
}

function random(min:number, max:number, p = 1):number {
	if(p <= 0) return Math.floor( Math.random()*(max-min+1))

	return Math.round( (random(min, max , 0) + random(min, max, p-1) ) / 2 )
}


const configs:any[] = 	[
							... randomWalk(30).map( (value, index) => ['A', Math.floor(value*11), getPastDate(index+1) ]),
							... (new Array(30)).fill(0).map( (item, index) => ['B', ['depressed', 'neutral', 'excited'][random(0,2,0)], getPastDate(index+1) ]),
							... randomWalk(30).map( (value, index) => ['C', Math.floor(value*5), getPastDate(index+1) ] ),
							... (new Array(30)).fill(0).map( (item, index) => ['D', [true, false][random(0,1,0)], getPastDate(index+1) ] ),					
						]

