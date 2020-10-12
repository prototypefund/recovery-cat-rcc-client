import 	{ 
			Injectable, 
			Inject
		} 							from '@angular/core'

import 	{
			TranslocoLoader,
		} 							from '@ngneat/transloco'

import	{
			ScopedTranslationTable,
			SCOPED_TRANSLATION_TABLES
		}							from './translations.commons'


@Injectable()
export class RccTranslationLoader implements TranslocoLoader {

	constructor(
		@Inject(SCOPED_TRANSLATION_TABLES)
		private scopedTranslationTables: ScopedTranslationTable[]
	){}

	async getTranslation(lang: string) {

		let	t =	this.scopedTranslationTables
				.reduce( 
					(translationTable: any, {scope, map} ) => {

						if(scope == null) return {...translationTable, ...map[lang] }

						translationTable[scope] = {...(translationTable[scope]||{}), ...map[lang]}					

						return translationTable

					}
					, {} as any
				)

		return t
	}

}
