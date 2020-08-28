import	{	InjectionToken		}		from '@angular/core'

export interface WithValue {
	value:			any
}

export interface WithMeaning {
	meaning:		string
}

export interface WithTranslations {
	translations:	string[]
}

export type Translatable = WithMeaning | WithTranslations | WithValue | Date | boolean | string

export interface ScopedTranslationTable {
	scope: 			string
	map:			any
}

export const SCOPED_TRANSLATION_TABLES = new InjectionToken<ScopedTranslationTable>("")