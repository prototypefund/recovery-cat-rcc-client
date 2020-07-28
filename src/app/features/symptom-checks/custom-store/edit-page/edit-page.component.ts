import 	{ 
			Component
		}									from '@angular/core'

import	{	Location					}	from '@angular/common'

import	{
			ActivatedRoute,
			ParamMap
		}									from '@angular/router'

import	{
			FormControl,
			FormArray,
		}									from '@angular/forms'

import	{
			map
		}									from 'rxjs/operators'

import	{
			SymptomCheckCustomStore
		}									from '../symptom-check-custom-store.service'


import	{
			Question,
			SymptomCheck,
			SymptomCheckConfig,
			SymptomCheckStore,
			Schedule
		}									from '@rcc/core'

import	{
			MetaStoreService,
			ItemAction,
			RccModalController,
			RccToastController,
		}									from '@rcc/common'

import	{
			ScheduleModalComponent
		}									from '../schedule-modal/schedule-modal.component'


@Component({
	templateUrl: 	'./edit-page.component.html',
	styleUrls: 		['./edit-page.component.scss']
})
export class SymptomCheckEditPage {


	public originalSymptomCheck		: SymptomCheck | null
	public originalConfig			: SymptomCheckConfig | null

	public open: boolean 			= false

	public source 					= new FormControl('')
	public defaultSchedule			= new Schedule()
	public start					= new FormControl('')
	public defer					= new FormControl(false)

	public questions				: Question[] = []
	public questionSchedules		: { [index: string]: string } 

	public questionActions			: ItemAction<Question>[] =[]

	constructor(
		public activatedRoute			: ActivatedRoute,
		public symptomCheckCustomStore	: SymptomCheckCustomStore,
		public metaStoreService			: MetaStoreService,
		public rccModalController		: RccModalController,
		public rccToastController		: RccToastController,
		public location					: Location
	) {

		this.questionActions = 	[
									{
										label 	: 'CUSTOM_SYMPTOM_CHECK.REMOVE_QUESTION',
										icon	: 'remove',
										handler	: (question: Question) => this.removeQuestion(question)
									},

									{
										label 	: 'CUSTOM_SYMPTOM_CHECK.SET_QUESTION_SCHEDULE',
										icon	: 'time',
										handler	: (question: Question) => console.warn('set question schedule not yet implemented')
									},

								]

	}


	ngOnInit() {

		this.activatedRoute.paramMap
		.pipe(
			map(		(params	: ParamMap)				=> params.get('id') ),
		)
		.subscribe({
			next:		(id		: string|undefined)		=> this.setup(id) 
		})

	}

	public async setup(id: string|undefined): Promise<any> {

		if(!id) return this.originalSymptomCheck = null

		this.originalSymptomCheck = await this.metaStoreService.get(SymptomCheck, id)

		if(!this.originalSymptomCheck){
			console.warn('no matching symptom check found '+id)
			return null
		}

		this.originalConfig	= this.originalSymptomCheck.config

		this.source.setValue(this.originalConfig.meta.source)
		this.defaultSchedule.set(this.originalConfig.meta.defaultSchedule)

		const ids = this.originalConfig.questions.map( (entry:any) =>  entry.id || entry )

		this.questions = await this.metaStoreService.get(Question, ids)
		
		
	}

	public removeQuestion(question: Question){
		const pos = this.questions.indexOf(question)
		if(pos != -1) this.questions.splice(pos, 1)
	}


	public selectQuestions(){

		this.metaStoreService
		.selectItems(Question, this.questions)
		.then( 	(questions : Question[]) 	=> this.questions = questions )
		.catch(	(reason) 					=> (reason != 'user_canceled') && Promise.reject(reason) )

	}

	public async editSchedule(schedule: Schedule){
		return await 	this.rccModalController.present(ScheduleModalComponent, { schedule })
						.then( (result: Schedule | null ) 	=> result && schedule.set(result.toString()) )
	}

	//validation missing


// export interface SymptomCheckMeta {	
// 	source?:			string		//Source
// 	defaultSchedule?:	string		//rrule, default schedule	
// 	creationDate?:		string		//Some date format
// }


// export interface SymptomCheckQuestionSchedule {
// 	id:				string 		// Question id
// 	schedule:		string		// rrule
// }


// export type SymptomCheckItem = string | SymptomCheckQuestionSchedule


// export interface SymptomCheckConfig {
// 	meta:				SymptomCheckMeta
// 	questions:			SymptomCheckItem[]
// }





	public async save(){		

		try {			
			let config: SymptomCheckConfig = 	{
													meta:		{
																	source: 			this.source.value,
																	defaultSchedule:	this.defaultSchedule.toString(),
																},
																
													questions:	this.questions.map( (question:Question) => question.id)			
												}

			await this.symptomCheckCustomStore.addSymptomCheckConfig(config)

		} catch(e) {			
			return this.rccToastController.failure('CUSTOM_SYMPTOM_CHECKS.EDIT.SAVE_FAILURE')
		}

		this.location.back()

		return this.rccToastController.success('CUSTOM_SYMPTOM_CHECKS.EDIT.SAVE_SUCCESS')


	}


}
