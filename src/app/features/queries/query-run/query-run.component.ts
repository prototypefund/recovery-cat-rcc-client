import 	{ 	
			Component, 
			ComponentRef, 
			OnInit, 
			Input,
			ViewChild,
			Optional
		}     								from '@angular/core'

import 	{ 	IonSlides 					}	from '@ionic/angular'
import	{	Question					}	from '@rcc/core'
import	{	Query						}	from '../query.class'


@Component({
	selector:     'rcc-query-run',
	templateUrl:   './query-run.component.html',
	styleUrls:     ['./query-run.component.scss']
})
export class QueryRunComponent {

	@ViewChild(IonSlides,	{static:true}) 	
	slides		: IonSlides

	@Optional() @Input()
	set questions(questions: Question[]){
		this.setQuestions(questions)		
	}

	public slideOpts = 	{
							initialSlide:	0,
							speed:			400,
						}

	public  queries			: Query[]	= []

	public	atStart			: boolean 	= true
	public	atEnd			: boolean 	= false
	public 	activeQuery		: Query 

	public	pageHandlers	: any[]		= []
	public 	activePage		: number	= 0

	private queryOnSlide	: Query[] 	= []


	constructor(){}


	public get trackSlides(){
		return 	function(index:number , query: Query){
					this.queryOnSlide[index] = query
					return query		
				}.bind(this)
	}


	public setQuestions( questions : Question[] ){
		questions
		?	this.queries = questions.map( (question: Question) => new Query(question) )
		:	this.queries = []

		this.pageHandlers 	= this.queries.map( (query: Query, index: number) => ({ handler:  () => this.slides.slideTo(index) }))
	}


	public checkOff(query: Query){
		query.submit()
		.then( () => (query == this.activeQuery) && this.slides.slideNext() )
	}


	public afterSlideChange(){

		this.slides.isBeginning()
		.then( result => this.atStart 	= result )

		this.slides.isEnd()
		.then( result => this.atEnd 	= result )

		this.slides.getActiveIndex()
		.then( index => {
			this.activeQuery 	= this.queryOnSlide[index] 
			this.activePage		= this.activePage = index
		})
	}


}

