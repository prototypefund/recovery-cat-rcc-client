import	{	InjectionToken		}		from '@angular/core'


export interface ScopedTranslationTable {
	scope: 	string
	map:	any
}

export const SCOPED_TRANSLATION_TABLES = new InjectionToken<ScopedTranslationTable>("")