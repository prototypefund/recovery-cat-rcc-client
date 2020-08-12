import	{ 
			Component, 
			OnInit,
			Input 
		}								from '@angular/core'

export interface pageHandler {
	label?		: 	string,
	handler		:	(...args:any[]) => any
}

@Component({
	selector: 		'rcc-pagination',
	templateUrl: 	'./pagination.component.html',
	styleUrls: 		['./pagination.component.scss'],
})
export class Pagination implements OnInit {

	@Input()
	public pageHandlers		: pageHandler[] 

	@Input()
	public activePage		: number

	public bullets 			: any[] 		= []
	public _pageHandlers	: pageHandler[]	= []	
	public _activePage		: number
	public starting_gap		: boolean		= false
	public ending_gap		: boolean		= false

	public activeIndex		: number		= 0

	constructor() {}


	public isVisible(index :number, activePage : number){
		const length = this.pageHandlers.length

		if(index < 0) 		return true
		if(index >= length) return true

		return 		index == 0
				||	index == length-1 
				||	(activePage <= 2 && index <= 3) 
				||	(length-activePage <=3 && length-index <= 4) 
				||	Math.abs(activePage-index) <=1
	}

	public refreshPages(){

		const activePage = this._activePage || 0

		if(this._pageHandlers.length <= 5) {
			this.starting_gap 	= false
			this.ending_gap		= false
			this.bullets		= this._pageHandlers
			this.activeIndex	= activePage
		}

		if(this._pageHandlers.length > 5) {

			this.starting_gap 	= activePage >= 3
			this.ending_gap		= this._pageHandlers.length - activePage >= 4
			this.bullets		= []


			if( !this.starting_gap ) {
				this.bullets.push(this._pageHandlers[0])
				this.bullets.push(this._pageHandlers[1])
				this.bullets.push(this._pageHandlers[2])
				this.bullets.push(this._pageHandlers[3])

				this.bullets.push(this._pageHandlers[this._pageHandlers.length-1])

				this.activeIndex = activePage
			}


			if( this.starting_gap && this.ending_gap ) {

				this.bullets.push(this._pageHandlers[0])

				this.bullets.push(this._pageHandlers[activePage-1])
				this.bullets.push(this._pageHandlers[activePage])
				this.bullets.push(this._pageHandlers[activePage+1])

				this.bullets.push(this._pageHandlers[this._pageHandlers.length-1])

				this.activeIndex = 2

			}


			if(!this.ending_gap) {	

				this.bullets.push(this._pageHandlers[0])

				this.bullets.push(this._pageHandlers[this._pageHandlers.length-4])
				this.bullets.push(this._pageHandlers[this._pageHandlers.length-3])
				this.bullets.push(this._pageHandlers[this._pageHandlers.length-2])
				this.bullets.push(this._pageHandlers[this._pageHandlers.length-1])

				this.activeIndex = 5-(this._pageHandlers.length-activePage)

			}

		}



	}


	ngOnInit() {}

}
