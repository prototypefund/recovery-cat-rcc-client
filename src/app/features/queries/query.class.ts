import 	{	
			FormControl,
			ValidationErrors,
			AbstractControl,
			AsyncValidatorFn		
		}								from "@angular/forms"

import	{	
			Question,
			QuestionValidationError		
		}								from "@rcc/core"


export class Query {

	question	: Question
	formControl	: FormControl	

	constructor(question: Question){

		const asyncValidatorFn 	= 	async function(control:AbstractControl): Promise<ValidationErrors | null> {			
										return	question.validateAnswer(control.value)
												.catch( (error:any) => error instanceof QuestionValidationError ? error : Promise.reject(error) )
									}


		this.question			=	question									
		this.formControl		= 	new FormControl('', null, asyncValidatorFn)

	}

	get answer() {
		return this.formControl.value
	}

	get complete(){
		return this.formControl.valid
	}

}

