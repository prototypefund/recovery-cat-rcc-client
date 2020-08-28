import  {
			Component, 
			Input,
			OnInit
		}               from '@angular/core'

import  { SubscriptionLike    } from 'rxjs'


import  { 
			Question,
			Report,
			Entry      
		}               from '@rcc/core'


import  { NgxChartsModule     } from '@swimlane/ngx-charts'


@Component({
	selector:   'rcc-chart-widget',
	templateUrl:  './chart-widget.component.html',
	styleUrls:  ['./chart-widget.component.scss'],
})
export class ChartWidgetComponent implements OnInit{

	@Input()
	public set question(question  : Question){
		this.setQuestion(question)
	}

	@Input()
	public set report(report: Report){
		this.setReport(report)
	}

	public _question 	: Question
	public _report		: Report
	public ready		: boolean

	data			: 	any[]
	view			:	any[] 		= [700, 300]

	colorScheme		: 	any

	// options
	legend			:	boolean 	= false
	animations		:	boolean 	= false
	xAxis			:	boolean 	= true
	yAxis			:	boolean 	= true
	yScaleMin		:	number		 
	yScaleMax		:	number		


	constructor() {
		//this.data = []
		//Object.assign(this, { multi });
	}

	ngOnInit(){

	}

	// [
 //  {
 //    "name": "Germany",
 //    "series": [
 //      {
 //        "name": "2010",
 //        "value": 7300000
 //      },
 //      {
 //        "name": "2011",
 //        "value": 8940000
 //      }
 //    ]
 //  },

 	public setQuestion(question : Question){
 		if(!question) return;
 		
		this._question = question

		if(this._report) this.setup()
 	}

	public setReport(report: Report){
		if(!report) return;

		this._report = report

		if(this._question) this.setup()
	}


	public setup(){

		if(['integer', 'decimal'].includes(this._question.type)){
			this.data = [
							{
								name: 	'',
								series:	this._report.entries.map( (entry: Entry) => ({
											name: 	entry.date,
											value:	entry.answer
										}))
							}
						]

			this.yScaleMin 	= this._question.min || Math.min(... this._question.options.map( (option:any) => option.value) ) ||0
			this.yScaleMax	= this._question.max || Math.max(... this._question.options.map( (option:any) => option.value) ) ||5
		}

		if(['string'].includes(this._question.type) && this._question.options || this._question.type == 'boolean') {

			const week = 1000*60*60*24*7


			this.colorScheme = {
    			domain: ['#e95849', '#92949c', '#1abc9c',]
  			}



			let stats:any = {}

			if(this._question.options) {

				this.colorScheme = {
	    			domain: ['#e95849', '#92949c', '#1abc9c',]
	  			}
				this._question.options.forEach( (option:any) => stats[option.value] = 0)

			}

			if(this._question.type =='boolean'){
				this.colorScheme = {
	    			domain: ['#e95849', '#1abc9c',]
	  			}

	  			stats = {false: 0, true:0}

			}

			const stats_1 =  	this._report.entries
								.filter( (entry: any) => {
									const diff = (Date.now() - entry.date.getTime())

									return diff > 0 && diff <= 1*week
								})
								.reduce( (a:any, entry:any) => {
									a[String(entry.answer)] = (a[String(entry.answer)]||0) + 1

									return a
								}, {...stats})

			const stats_2 =  	this._report.entries
								.filter( (entry: any) => {
									const diff = (Date.now() - entry.date.getTime())

									return diff > 1*week && diff <= 2*week
								})
								.reduce( (a:any, entry:any) => {
									a[String(entry.answer)] = (a[String(entry.answer)]||0) + 1

									return a
								}, {...stats})

			const stats_3 =  	this._report.entries
								.filter( (entry: any) => {
									const diff = (Date.now() - entry.date.getTime())

									return diff > 2*week && diff <= 3*week
								})
								.reduce( (a:any, entry:any) => {
									a[String(entry.answer)] = (a[String(entry.answer)]||0) + 1

									return a
								}, {...stats})					


			const stats_4 =  	this._report.entries
								.filter( (entry: any) => {
									const diff = (Date.now() - entry.date.getTime())

									return diff > 3*week && diff <= 4*week
								})
								.reduce( (a:any, entry:any) => {
									a[String(entry.answer)] = (a[String(entry.answer)]||0) + 1

									return a
								}, {...stats})										


			this.data = [
							{
								name: 		'Last 7 days',
								series:		Object.keys(stats_1).map( (key:any) => ({
												name: key,
												value: stats_1[key]												
											}))
							},

							{
								name: 		'2 weeks ago',
								series:		Object.keys(stats_2).map( (key:any) => ({
												name: key,
												value: stats_2[key]												
											}))
							},

							{
								name: 		'3 weeks ago',
								series:		Object.keys(stats_3).map( (key:any) => ({
												name: key,
												value: stats_3[key]												
											}))
							},

							{
								name: 		'4 weeks ago',
								series:		Object.keys(stats_4).map( (key:any) => ({
												name: key,
												value: stats_4[key]												
											}))
							},
						].reverse()
		}

		this.ready = true

	}


	onSelect(data : any): void {
		console.log('Item clicked', JSON.parse(JSON.stringify(data)));
	}

	onActivate(data : any): void {
		console.log('Activate', JSON.parse(JSON.stringify(data)));
	}

	onDeactivate(data : any): void {
		console.log('Deactivate', JSON.parse(JSON.stringify(data)));
	}

}
