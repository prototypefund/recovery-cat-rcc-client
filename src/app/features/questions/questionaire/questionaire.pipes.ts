import 	{ 
			Pipe, 
			PipeTransform,
			ComponentRef,
			Injector,
			ReflectiveInjector
		}								from '@angular/core'

import	{	Question				}	from '@rcc/core'
import	{	
			Translatable
		}								from '@rcc/common'

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
	name: 'options2Translatables'
})
export class Options2TranslatablesPipe implements PipeTransform {

	transform(question: Question): Translatable[] {		
		if(!question.options) return []
		const options_with_labels = question.options.filter( option => option.meaning || option.translations)
		if(options_with_labels.length == 0) return question.options

		return 	options_with_labels
	}
}


@Pipe({
	name: 'answerTo'
})
export class AnswerToPipe implements PipeTransform {

	constructor(private questionaire: Questionaire){}

	async transform(answer: string, id: string, lang? : string): Promise<Translatable> {		
		const question = await this.questionaire.get(id)

		if(question.type == "boolean") 	return answer
		if(question.options)			return question.options.find( option => option.value == answer)

		return answer
	}
}
