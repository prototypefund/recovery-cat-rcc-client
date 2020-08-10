import	{
			Pipe, 
			PipeTransform,
			ChangeDetectorRef,
			Inject,
			Optional
		}						from '@angular/core'

import	{
			TranslocoPipe,
			TranslocoService,
			MaybeArray,
			TranslocoScope,
			TRANSLOCO_SCOPE,
			TRANSLOCO_LANG
		}						from '@ngneat/transloco'

import	{
			Translatable
		}						from './translations.commons'


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




@Pipe({ 
	name: 'translate',
	pure: false
})
export class RccTranslatePipe implements PipeTransform {

	translocoPipe: TranslocoPipe	

	constructor(
		private translocoService: TranslocoService,

		@Optional() @Inject(TRANSLOCO_SCOPE) 	
		private providerScope: MaybeArray<TranslocoScope>,

		@Optional() @Inject(TRANSLOCO_LANG) 	
		private providerLang: string | null,
		
		private cdr: ChangeDetectorRef
	){
		this.translocoPipe = new  TranslocoPipe(this.translocoService, providerScope, providerLang, cdr)
	}

	transform(str: string | Translatable) {
		if(typeof str == 'string') 		return this.translocoPipe.transform(str)
		if((str as any).translations)	return (str as any).translations[this.translocoService.getActiveLang()] || (str as any).meaning
			
		return (str as any).meaning	|| ''
	}
}