import 	{ 
			Component, 
			OnInit,
			OnDestroy
		}								from '@angular/core'

import	{
			FormControl,
			FormArray,
			FormGroup,
			ValidationErrors
		}								from '@angular/forms'

import	{	
			TranslationMap,
			QuestionConfig
		}								from '@rcc/core'

import	{	CustomQuestionStore		}	from '../custom-question-store.service'

@Component({
	selector: 		'rcc-custom-question.page',
	templateUrl: 	'./custom-question.page.html',
	styleUrls: 		['./custom-question.page.scss'],
})
export class CustomQuestionPage implements OnInit, OnDestroy {



	public	question					= 	new FormControl('', this.validateQuestion.bind(this))

	public	kinds		: string[]		= 	['yes_no', 'select', 'scale_discrete', 'scale_continuous', 'input']
	public	kind 						= 	new FormControl('', this.validateKind.bind(this)) 

	public	min							= 	new FormControl(null, this.validateMin.bind(this)) 
	public	max							= 	new FormControl(null, this.validateMax.bind(this))

	public 	useSteps					= 	new FormControl(false)
	public	step						= 	new FormControl(null, this.validateStep.bind(this))

	public	scaleOptions				= 	new FormArray([], this.validateScaleOptions.bind(this))
	public	selectOptions				= 	new FormArray([], this.validateSelectOptions.bind(this))


	public	answerTypes					= 	['string', 'integer', 'float']
	public	answerType					= 	new FormControl('string', this.validateAnswerType.bind(this))	

	public	unit						= 	new FormControl('', this.validateUnit.bind(this))


	public all	 						= 	new FormArray([
												this.question, 
												this.kind, 
												this.min, 
												this.max, 
												this.useSteps, 
												this.scaleOptions, 
												this.selectOptions, 
												this.answerType,
												this.unit
											])

	

	constructor(
		private customQuestionStore : CustomQuestionStore
	) {}

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


	protected validateQuestion(q:FormControl): ValidationErrors | null {
		return 	q.value
				?	null
				:	{ question_empty: true }
	}

	protected validateKind(k:FormControl): ValidationErrors | null{
		return 	this.kinds.includes(k.value)
				?	null
				:	{ kind_unknown: true }	
	}

	protected validateMin(m:FormControl): ValidationErrors | null {
		if( this.kind.value != 'scale_continuous') 	return null
		if( !isNaN(m.value)) 						return null

		return { 'min_nan' :true}
			
	}

	protected validateMax(m:FormControl): ValidationErrors | null{
		if( this.kind.value != 'scale_continuous') 	return null
		if( !isNaN(m.value)) 						return null

		return { 'max_nan' :true}
			
	}

	protected validateStep(s:FormControl):ValidationErrors | null {
		if( this.kind.value != 'scale_continuous')	return null
		if( !this.useSteps.value )					return null

		if( isNaN(s.value))							return { 'step_nan': 		true }
		if( s.value <= 0)							return { 'step_lte_zero': 	true }

		return null
	}

	protected validateScaleOptions(o:FormArray): ValidationErrors | null {
		if( this.kind.value != 'scale_continuous')	return null
		if( o.controls.length < 2)					return {'opt_count': true}
		
		return null
	}

	protected validateScaleOption(o:FormControl): ValidationErrors | null {
		if( this.kind.value != 'scale_continuous')	return null
		if(!o.value.value)							return { 'opt_value_missing': 	true }
		if(isNaN(o.value.value))					return { 'opt_nan':				true }	

		return null
	}

	protected validateSelectOptions(o:FormArray): ValidationErrors | null {
		if( this.kind.value != 'select')			return null
		if( o.controls.length < 2)					return {'opt_count': true}
		
		return null
	}

	protected validateSeclectOption(o:FormControl): ValidationErrors | null {
		if( this.kind.value != 'select')			return null
		if(!o.value.value)							return { 'opt_value_missing': 	true }
		if(isNaN(o.value.value))					return { 'opt_value_nan':		true }	

		if(!o.value.meaning)						return { 'opt_value_missing':	true }
		return null
	}

	protected validateAnswerType(a: FormControl): ValidationErrors | null {
		if(this.kind.value != 'input')				return null
		if(this.answerTypes.includes(this.kind.value))	return null

		return { 'answer_type_unknown': true}	
	}

	protected validateUnit(u:FormControl): ValidationErrors | null {

		if(this.kind.value == 'input' && !['float', 'integer'].includes(this.answerType.value)) return null

		if(!['scale_discrete', 'scale_continuous'].includes(this. kind.value))	return null

	}


	createQuestion(): void{
		const config:any = {}

		if(this.all.invalid) return;

		//needs this.question != ''

		config.meaning 		= 	this.question.value
		config.translations	= 	{ 'en-US': this.question.value }



		//needs max, min and step to line up

		config.type			=	({
									yes_no:				'boolean',
									select:				'string',
									scale_discrete:		'integer',
									scale_continuous:	Number.isInteger(this.step.value) && this.step.value > 0 && Number.isInteger(config.min.value)  //needs step to be null or > 0
														?	'integer'
														:	'float',
									input:				this.answerType.value //needs answerType to be not null
								}as any)[this.kind.value]			//needs this.kind to be not null


		//nees min < max!
		config.min			=	({
									yes_no:				undefined,
									select:				undefined,
									scale_discrete:		undefined,
									scale_continuous:	this.min.value, //needs this.min to be not null
									input:				undefined
								}as any)[this.kind.value]			//needs this.kind to be not null

		config.max			=	({
									yes_no:				undefined,
									select:				undefined,
									scale_discrete:		undefined,
									scale_continuous:	this.max.value, //needs this.min to be not null
									input:				undefined
								}as any)[this.kind.value]			//needs this.kind to be not null

		config.unit			=	['float', 'integer'].includes(config.type)
								?	this.unit.value
								:	undefined

		config.tags			=	[]
								.concat( ['scale_discrete', 'scale_continuous'].includes(this.kind.value) ? ['scale'] : [] )

		config.options		=	({
									yes_no:				undefined,
									select:				this.selectOptions.value,		  //needs selectOptions to count at least 2
									scale_discrete:		this.scaleOptions.value, //needs scaleOptions to count at least 3
									scale_continuous:	config.type.value == 'integer'
														?	[...Array(Math.floor((config.max - config.min)/this.step.value)+1)]
															.map( n => n + config.max)
														:	undefined,
									input:				undefined
								}as any)[this.kind.value]					

		//TODO
		config.id			=	'custom-'+Date.now()

					
		this.customQuestionStore.addQuestionConfig(config)
		.catch(console.log)

	}

	ngOnInit() {

	}

	ngOnDestroy() {}

}
