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

	constructor(private Questionaire: Questionaire){}

	transform(id: string): Promise<Question> {		
		return this.Questionaire.get(id)
	}
}
