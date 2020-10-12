import 	{ 	
			Component, 
			ComponentRef, 
			Input,
			ViewChild,
			Optional,
			OnInit,
			OnDestroy
		}     								from '@angular/core'
import	{	Location,					}	from '@angular/common'
import 	{ 	IonSlides 					}	from '@ionic/angular'
import	{	SubscriptionLike			}	from 'rxjs'
import	{	
			Question, 
			Entry					
		}									from '@rcc/core'
import	{	RccToastController			}	from '@rcc/common'
import	{	Journal						}	from '@rcc/features/entries'
import	{	Query						}	from '../query.class'
import	{	
			QueryRun,
			QueryRunService				
		}									from '../query-run.service'

@Component({
	selector:     'rcc-query-run-page',
	templateUrl:   './query-run-page.component.html',
	styleUrls:     ['./query-run-page.component.scss']
})
export class QueryRunPage implements OnDestroy{



	@ViewChild(IonSlides) 	
	public slides		: IonSlides


	public slideOpts = 	{
							initialSlide:	0,
							speed:			400,
						}

	public  queryRun			: QueryRun

	public	atStart				: boolean 	= true
	public	atEnd				: boolean 	= false
	public 	activeQuery			: Query 

	public	pageHandlers		: any[]		= []
	public 	activePage			: number	= 0

	private queryOnSlide		: Query[] 	= []

	private question_ids		: string[]	= []

	private subscriptions		: SubscriptionLike [] = []

	public 	invalid				: boolean

	constructor(
		public queryRunService		: QueryRunService,
		public journal				: Journal,
		public rccToastController	: RccToastController,
		public location				: Location
	){}


	ngOnInit(){
		const state 			= 	this.location.getState()
		const qr_timestamp		=	(state as any).queryRun
		const ids				= 	(state as any).ids
		const index				= 	(state as any).index


		this.subscriptions.push(
			this.location.subscribe( data => {
				if((typeof data.state.index) == 'number') this.slides.slideTo(data.state.index)					
			})
		)

	
		this.queryRunService.start(ids)
		.then( 
			queryRun => {
				this.queryRun 		= queryRun
				this.pageHandlers 	= queryRun.queries.map( (query: Query, index: number) => ({ handler:  () => this.slides.slideTo(index) }))
				this.activePage		= index || 0
				this.updateLocationState(true) 		
			},
			reason => {
				this.invalid = true
			}
		)	
		
	}

	ngOnDestroy(){
		this.subscriptions.forEach( sub => sub.unsubscribe() )
	}


	get queries(){ return this.queryRun && this.queryRun.queries || [] }

	get numberOfAnsweredQueries(){
		return this.queries.filter( query => query.entry).length
	}


	private updateLocationState(replace?: boolean){
		if(!this.queryRun) return false

		const current_state = (this.location.getState() as any)

		if( current_state.index		== this.activePage) return;
		
		const state = { index: this.activePage || 0 }
		const path	= this.location.path()

		replace
		?	this.location.replaceState(path, '', state)
		:	this.location.go(path, '', state)

	}


	public get trackSlides(){
		return 	function(index:number , query: Query){
					this.queryOnSlide[index] = query
					return query		
				}.bind(this)
	}



	public checkOff(query: Query){
		query.submit()
		.then( () => (query == this.activeQuery) && this.slides.slideNext() )
	}


	public onSlideChange(){

		this.slides.isBeginning()
		.then( result => this.atStart 	= result )

		this.slides.isEnd()
		.then( result => this.atEnd 	= result )

		this.slides.getActiveIndex()
		.then( index => {
			this.activeQuery 	= this.queryOnSlide[index] 
			this.activePage		= this.activePage = index

			
			this.updateLocationState()
		})

	}


}

