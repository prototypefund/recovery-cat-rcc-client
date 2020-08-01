import 	{ 
			Component, 
			OnInit
		}								from '@angular/core'

import	{
			FormControl,
			FormArray,
			FormGroup,
			ValidationErrors
		}								from '@angular/forms'

import	{	
			QuestionConfig
		}								from '@rcc/core'

import	{
			RccToastController
		}								from '@rcc/common'

import	{	CustomQuestionStore		}	from '../custom-question-store.service'

@Component({
	selector: 		'rcc-custom-question.page',
	templateUrl: 	'./custom-question.page.html',
	styleUrls: 		['./custom-question.page.scss'],
})
export class CustomQuestionPage implements OnInit {



	public	question					= 	new FormControl('', this.validateQuestion.bind(this))

	public	questionTypes	: string[]	= 	['yes_no', 'select', 'scale_discrete', 'scale_continuous', 'input']
	public	questionType 				= 	new FormControl(this.questionTypes[0], this.validatequestionType.bind(this)) 

	public	min							= 	new FormControl(null, this.validateMin.bind(this)) 
	public	max							= 	new FormControl(null, this.validateMax.bind(this))

	public 	useSteps					= 	new FormControl(false)
	public	step						= 	new FormControl(null, this.validateStep.bind(this))

	public	scaleOptions				= 	new FormArray([], this.validateScaleOptions.bind(this))
	public	selectOptions				= 	new FormArray([], this.validateSelectOptions.bind(this))


	public	answerTypes					= 	['string', 'integer', 'decimal']
	public	answerType					= 	new FormControl('string', this.validateAnswerType.bind(this))	

	public	unit						= 	new FormControl('', this.validateUnit.bind(this))


	public 	allForms					= 	new FormArray([
													this.question, 
													this.questionType, 
													this.min, 
													this.max, 
													this.useSteps, 
													this.scaleOptions, 
													this.selectOptions, 
													this.answerType,
													this.unit
											])

	public _errors			: string[]	= []

	constructor(
		private customQuestionStore : CustomQuestionStore,
		private rccToastController	: RccToastController
	) {}


	ngOnInit(){
		this.questionType.valueChanges.subscribe( (type:string) =>{
			switch(type){
				case 'select':	
					while(this.selectOptions.length < 2) this.addSelectOption()
				break

				case 'scale_discrete':
					while(this.scaleOptions.length < 2) this.addScaleOption()
				break

			}

		})
	}

	addScaleOption(){
		let last_value: number

		try{
			last_value = parseInt(this.scaleOptions.at(this.scaleOptions.length-1).value.value) 
		}catch(e){
			last_value = -1
		}

		this.scaleOptions.push( 
			new FormGroup(
					{ 
						value: 		new FormControl(last_value+1), 
						meaning: 	new FormControl('')
					}, 
					this.validateScaleOption.bind(this)
				)
		)
	}

	addSelectOption(){
		this.selectOptions.push( 
			new FormGroup(
					{ 
						value: 		new FormControl(''), 
						meaning: 	new FormControl('')
					}, 
					this.validateSeclectOption.bind(this)
				) 
		)

	}	

	get firstError(): string | null {
		const first_control_with_errors = this.allForms.controls.find( (control: FormControl)  => control.errors )

		return 	first_control_with_errors
				?	Object.keys(first_control_with_errors.errors)[0]
				:	null

	}

	protected validateQuestion(q:FormControl): ValidationErrors | null {
		return 	q.value
				?	null
				:	{ question_empty: true }
	}

	protected validatequestionType(k:FormControl): ValidationErrors | null{
		return 	this.questionTypes.includes(k.value)
				?	null
				:	{ questionType_unknown: true }	
	}

	protected validateMin(m:FormControl): ValidationErrors | null {
		if( this.questionType.value != 'scale_continuous') 	return null
		if( !isNaN(m.value)) 						return null

		return { 'min_nan' :true}
			
	}

	protected validateMax(m:FormControl): ValidationErrors | null{
		if( this.questionType.value != 'scale_continuous') 	return null
		if( !isNaN(m.value)) 						return null

		return { 'max_nan' :true}
			
	}

	protected validateStep(s:FormControl):ValidationErrors | null {
		if( this.questionType.value != 'scale_continuous')	return null
		if( !this.useSteps.value )					return null

		if( isNaN(s.value))							return { 'step_nan': 		true }
		if( s.value <= 0)							return { 'step_lte_zero': 	true }

		return null
	}

	protected validateScaleOptions(o:FormArray): ValidationErrors | null {
		if( this.questionType.value != 'scale_continuous')	return null
		if( o.controls.length < 2)					return {'opt_count': true}
		
		const first_option_with_errors =  o.controls.find( (control: FormControl) => control.errors)
		if(first_option_with_errors) 				return first_option_with_errors.errors

		return null
	}

	protected validateScaleOption(o:FormControl): ValidationErrors | null {
		if( this.questionType.value != 'scale_continuous')	return null

		if(!o.value.value)							return { 'opt_value_missing': 	true }
		if(isNaN(o.value.value))					return { 'opt_nan':				true }	

		return null
	}

	protected validateSelectOptions(o:FormArray): ValidationErrors | null {
		if( this.questionType.value != 'select')	return null

		if( o.controls.length < 2)					return {'opt_count': true}
		
		const first_option_with_errors =  o.controls.find( (control: FormControl) => control.errors)

		if(first_option_with_errors) 				return first_option_with_errors.errors

		return null
	}

	protected validateSeclectOption(o:FormControl): ValidationErrors | null {
		if( this.questionType.value != 'select')	return null

		if(!o.value.value)							return { 'opt_value_missing': 	true }
		if(!o.value.meaning)						return { 'opt_label_missing':	true }
		return null
	}

	protected validateAnswerType(a: FormControl): ValidationErrors | null {
		if(this.questionType.value != 'input')					return null
		if(this.answerTypes.includes(this.questionType.value))	return null

		return { 'answer_type_unknown': true}	
	}

	protected validateUnit(u:FormControl): ValidationErrors | null {

		if(this.questionType.value == 'input' && !['decimal', 'integer'].includes(this.answerType.value)) return null

		if(!['scale_discrete', 'scale_continuous'].includes(this. questionType.value))	return null

	}


	public async save(): Promise<any>{
		const config:any = {}

		if(this.allForms.invalid) return "invalid config form";

		//needs this.question != ''

		config.meaning 		= 	this.question.value
		config.translations	= 	{ 'en-US': this.question.value }



		//needs max, min and step to line up

		config.type			=	({
									yes_no:				'boolean',
									select:				'string',
									scale_discrete:		'integer',
									scale_continuous:	Number.isInteger(this.step.value) && this.step.value > 0 && Number.isInteger(this.min.value)  //needs step to be null or > 0
														?	'integer'
														:	'decimal',
									input:				this.answerType.value //needs answerType to be not null
								}as any)[this.questionType.value]			//needs this.questionType to be not null


		//nees min < max!
		config.min			=	({
									yes_no:				undefined,
									select:				undefined,
									scale_discrete:		undefined,
									scale_continuous:	this.min.value, //needs this.min to be not null
									input:				undefined
								}as any)[this.questionType.value]			//needs this.questionType to be not null

		config.max			=	({
									yes_no:				undefined,
									select:				undefined,
									scale_discrete:		undefined,
									scale_continuous:	this.max.value, //needs this.min to be not null
									input:				undefined
								}as any)[this.questionType.value]			//needs this.questionType to be not null

		config.unit			=	['decimal', 'integer'].includes(config.type)
								?	this.unit.value
								:	undefined

		config.tags			=	[]
								.concat( ['scale_discrete', 'scale_continuous'].includes(this.questionType.value) ? ['scale'] : [] )

		config.options		=	({
									yes_no:				undefined,
									select:				this.selectOptions.value,		  //needs selectOptions to count at least 2
									scale_discrete:		this.scaleOptions.value, //needs scaleOptions to count at least 3
									scale_continuous:	config.type.value == 'integer'
														?	[...Array(Math.floor((config.max - config.min)/this.step.value)+1)]
															.map( n => n + config.max)
														:	undefined,
									input:				undefined
								}as any)[this.questionType.value]					

		//TODO
		config.id			=	'custom-'+Date.now()

		
		try{			
			await this.customQuestionStore.addQuestionConfig(config)
			this.rccToastController.present({message:'CUSTOM_QUESTIONS.EDIT.SAVE_SUCCESS'})
		} catch (reason) {
			console.warn(reason) //TODO
			this.rccToastController.present({message:'CUSTOM_QUESTIONS.EDIT.SAVE_FAILURE'})
		}
		

	}


}
