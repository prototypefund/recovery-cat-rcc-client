import	{
			Component,
			Input,
			OnDestroy
		}							from '@angular/core'

import	{
			Question
		}							from '@rcc/core'

import	{
			Query
		}							from '@rcc/features/queries'


@Component({
	templateUrl: 	'./scale.component.html',
	styleUrls: 		['./scale.component.scss'],
})
export class ScaleQueryWidgetComponent  implements OnDestroy {
	
	static widgetMatch(question: Question): number{

		console.log(question)

		return 	question.tags.includes('scale')
				?	1
				:	-1
	}


	public subscription: any

	public min: 		number
	public max: 		number
	public length:		number
	public label_count:	number

	public options: any[]

	constructor(
		public 	query		: Query,
	){

		this.query 			= query
		this.subscription 	= query.formControl.valueChanges.subscribe({
			next : value => {
			}
		})


		//TODO: meaning -> wording

		this.min = this.query.question.min || Math.min(...this.query.question.options.map( option => option.value as number ) )
		this.max = this.query.question.max || Math.max(...this.query.question.options.map( option => option.value as number ) )
		
		this.options = new Array(this.max-this.min+1)
		this.options.fill(0)
		this.options = this.options.map( 
			(x:any, index:number) => 
				this.query.question.options.find( option => option.value == this.min+index ) 
				|| 
				{ value : this.min + index, meaning: ''}
		)

		this.length 		= 	this.max-this.min+1
		this.label_count 	=	this.options.filter(this.hasLabel).length 

		console.log(this.options)

	}

	hasLabel(option:any){
		return !!(option && (option.meaning || Object.values(option.translations||{}).filter( x => !!x ).length > 0 ))
	}

	getOptionStyle(index:number, option?:any):any{

		const width				= 	1/this.label_count



		if(!this.hasLabel(option)) return { display: 'none'}

		let left 	= index/(this.length-1) - width/2
		let right 	= index/(this.length-1) + width/2

		if(!this.hasLabel(option))

		console.log(index, 0)
		if(index == 0){
			console.log('index is 0')
			left 	= 0
			right 	= width 
		}

		if(index == this.length-1){
			left	= 1-width
			right	= 0
		}

		console.log(index, left, this.length-1)

		return 	{
					left:			left*100+'%',
					right:			right*100+'%',
					width:			width*100+'%',
				}
	}

	ngOnDestroy(){
		this.subscription.unsubscribe()
	}

}
