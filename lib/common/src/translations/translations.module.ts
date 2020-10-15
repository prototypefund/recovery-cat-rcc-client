import 	{ 	
			ModuleWithProviders
		} 								from '@angular/core'

import	{	SETTING_CONFIGS			}	from '../settings/settings.commons'

import 	{
			Translation,
			TranslocoLoader,
			TRANSLOCO_CONFIG,
			TRANSLOCO_LOADER,
			translocoConfig,
			TranslocoModule
		} 								from '@ngneat/transloco'

import 	{ 
			Injectable, 
			NgModule 
		} 								from '@angular/core'

import	{	
			RccTranslatePipe,
			FillPipe				
		}									from './translations.pipes'

import	{	RccTranslationLoader		}	from './translation.loader'

import	{	SCOPED_TRANSLATION_TABLES	}	from './translations.commons'

import	{	RccTranslationService		}	from './translation.service'


//TODO should be configurable; forRoot?:
import global_en from '../i18n/en.json'
import global_de from '../i18n/de.json'

import en from './i18n/en.json'
import de from './i18n/de.json'


@NgModule({
	declarations: [
		FillPipe,
		RccTranslatePipe
	],
	exports: [ 
		TranslocoModule, //TODO: remove
		FillPipe,
		RccTranslatePipe 
	],
	providers: [
		RccTranslationService, 
		RccTranslationLoader,
		{
			provide: 	TRANSLOCO_CONFIG,
			useValue: 	translocoConfig({
							availableLangs: 		['en', 'de'],
							defaultLang: 			'en',							
							reRenderOnLangChange: 	true,
							prodMode: 				true //TODO
						})
		},
		{ 
			provide:		TRANSLOCO_LOADER, 
			useExisting:	RccTranslationLoader 
		},
		{
			provide:	SCOPED_TRANSLATION_TABLES,
			useValue:	{
							scope: 	null,
							map:	{en:global_en, de: global_de}
						},
			multi:		true
		},
		{
			provide: 	SCOPED_TRANSLATION_TABLES,
			useValue:	{
							scope:	"TRANSLATIONS", 
							map:	{en, de}
						},
			multi:		true
		},

		//cannot use SettingsModule.forChild() due to circular dependencies.
		{
			provide: 	SETTING_CONFIGS,
			deps:		[RccTranslationService],
			useFactory:	( rccTranslationService : RccTranslationService ) => ({
							label: 		'TRANSLATIONS.ACTIVE_LANGUAGE',
							options:	rccTranslationService.getAvailableLanguages()
										.map( (lang: string) => ({ value: lang, label: "TRANSLATIONS.LANGUAGES."+lang.toUpperCase() }) ) ,
							change$: 	rccTranslationService.activeLanguageChange$,
							next: 		(value: any) => rccTranslationService.setActiveLanguage(value)
						}),
			multi:		true
		}
	]
})
export class TranslationsModule {

	static forChild(scope: string, map: any): ModuleWithProviders<TranslationsModule> {
		return 	{
					ngModule: 	TranslationsModule,
					providers:	[
									{
										provide: 	SCOPED_TRANSLATION_TABLES,
										useValue:	{
														scope, 
														map
													},
										multi:		true
									}
								]
				}
	}
}
