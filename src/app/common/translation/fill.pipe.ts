import	{
			Pipe, 
			PipeTransform 
		}						from '@angular/core'


function fix(str:string = ''){
	return str.toUpperCase().replace(/[^A-Z0-9_\.]/g,"")
}

@Pipe({ name: 'fill' })
export class FillPipe implements PipeTransform {

	transform(translationKey: string = '', ...content: string[]) {
		content.forEach( (item, i) => {
			translationKey = translationKey.replace("%"+(i+1), fix(item))
		})

		return fix(translationKey)
	}
}