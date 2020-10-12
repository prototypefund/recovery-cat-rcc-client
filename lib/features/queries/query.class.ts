import 	{	
			FormControl,
			ValidationErrors,
			AbstractControl,
			AsyncValidatorFn		
		}								from "@angular/forms"

import	{	
			Question,
			QuestionValidationError,
			Entry,
			EntryConfig,
			EntryStore
		}								from "@rcc/core"

import	{	Journal					}	from "@rcc/features/entries"


export type SubmitEntryFn 	= (id:string, answer:string, note:string) 	=> Promise<Entry>
export type CancelEntryFn 	= (entry: Entry) 							=> Promise<any>



export class Query {

	public answerControl	: FormControl	
	public noteControl		: FormControl
	public entry			: Entry

	constructor(
		public question 	: Question,
		public submitEntry	: SubmitEntryFn,
		public cancelEntry	: CancelEntryFn
	){

		const asyncValidatorFn 	= 	async function(control:AbstractControl): Promise<ValidationErrors | null> {			
										return	question.validateAnswer(control.value)
												.catch( (error:any) => error instanceof QuestionValidationError ? error : Promise.reject(error))
									}


		this.question			=	question									
		this.answerControl		= 	new FormControl('', null, asyncValidatorFn)
		this.noteControl		= 	new FormControl('')

	}

	get answer() {
		return this.answerControl.value
	}

	get note(){
		return this.noteControl.value	
	}

	get complete(){
		return this.answerControl.valid
	}

	public async cancel(): Promise<Entry>{

		return await	this.cancelEntry(this.entry)
						.then( entry => {
							this.entry = undefined
							return entry
						})
	}

	public async submit(): Promise<Entry> {

		if(!this.complete) throw "Query.submit() invalid answer"

		return await	this.submitEntry(this.question.id, this.answer, this.note)
						.then( entry => {
							return this.entry = entry
						})
	}

}

