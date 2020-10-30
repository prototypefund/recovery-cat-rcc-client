import	{
			Component,
			Input,
			HostListener
		}							from '@angular/core'

import	{
			Question
		}							from '@rcc/core'

import	{
			Query
		}							from '../../queries'


@Component({
	templateUrl: 	'./scale.component.html',
	styleUrls: 		['./scale.component.scss'],
})
export class ScaleQueryWidgetComponent {
	
	static widgetMatch(question: Question): number{

		return 	question.tags && question.tags.includes('scale')
				?	2
				:	-1
	}



	//prevent other slide effects when handling the scale
	@HostListener('mousedown', ['$event'])
	@HostListener('touchstart', ['$event'])
	@HostListener('pointerdown', ['$event'])
	onTouch(event: any){
		event.stopPropagation()
	}



	public min: 		number
	public max: 		number
	public length:		number
	public label_count:	number

	public options: any[]

	constructor(
		public 	query		: Query,
	){

		this.query 			= query		

		const originalOptions = this.query.question.options || []

		
		this.min = this.query.question.min || Math.min(...originalOptions.map( option => option.value as number ) )
		this.max = this.query.question.max || Math.max(...originalOptions.map( option => option.value as number ) )
		
		this.options = new Array(this.max-this.min+1)
		this.options.fill(0)
		this.options = this.options.map( 
			(x:any, index:number) => 
				originalOptions.find( option => option.value == this.min+index ) 
				|| 
				{ value : this.min + index, meaning: ''}
		)

		this.length 		= 	this.max-this.min+1
		this.label_count 	=	this.options.filter(this.hasLabel).length 


	}

	hasLabel(option:any){
		return !!(option && (option.meaning || Object.values(option.translations||{}).filter( x => !!x ).length > 0 ))
	}

	getOptionStyle(index:number, option?:any):any{

		const width				= 	1/this.label_count



		if(!this.hasLabel(option)) return { display: 'none'}

		let left 	= index/(this.length-1) - width/2
		let right 	= index/(this.length-1) + width/2

		if(index == 0){
			left 	= 0
			right 	= width 
		}

		if(index == this.length-1){
			left	= 1-width
			right	= 0
		}

		return 	{
					left:			left*100+'%',
					right:			right*100+'%',
					width:			width*100+'%',
				}
	}


}
