import 	{ 
			Pipe, 
			PipeTransform,
			ComponentRef,
			Injector,
			ReflectiveInjector
		}								from '@angular/core'

import	{	
			Question
		}								from '@rcc/core'

import	{	
			Questionaire 
		}								from './questionaire.service'


@Pipe({
	name: 'id2Question'
})
export class Id2QuestionPipe implements PipeTransform {

	constructor(private questionaire: Questionaire){}

	transform(id: string): Promise<Question> {		
		return this.questionaire.get(id)
	}
}


@Pipe({
	name: 'answerTo'
})
export class AnswerToPipe implements PipeTransform {

	constructor(private questionaire: Questionaire){}

	async transform(answer: string, id: string, lang? : string): Promise<string> {		
		const question = await this.questionaire.get(id)

		if(question.type == "boolean") 	return 'QUESTIONAIRE.QUESTIONS.ANSWERS.'+String(answer).toUpperCase()
		if(question.options)			return 	question.options.find( option => option.value == answer).meaning

		return answer
	}
}
