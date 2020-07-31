import 	{ 	
			ModuleWithProviders
		} 								from '@angular/core'

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
		}								from './translations.pipes'

import 	{ 
			environment 
		} 								from '../../../environments/environment'

import	{
			RccTranslationLoader
		}								from './translation.loader'

import	{
			SCOPED_TRANSLATION_TABLES
		}								from './translations.commons'

import	{
			RccTranslationService
		}								from './translation.service'


import en from '../i18n/en.json'
import de from '../i18n/de.json'


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
							prodMode: 				environment.production,
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
							map:	{en,de}
						},
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
