import 	{ 	NgModule 					}	from '@angular/core'
import 	{ 	RouterModule 				}	from '@angular/router'


import	{	
			SharedModule,
			MetaStoreModule,
			TranslationsModule
		}									from '@rcc/common'


import	{	QuestionaireModule			}	from '../../questions'

import	{	SymptomCheckMetaStoreModule	}	from '../../symptom-checks/meta-store'

import	{	SymptomCheckViewPage		}	from './view-page/view-page.component'



import en from './i18n/en.json'
import de from './i18n/de.json'


const routes 		=	[
							{ path: 'symptom-checks/:id',	component: SymptomCheckViewPage	},
						]


const actions		=	[
							{ 
								label: 		'SYMPTOM_CHECKS_VIEW.ACTIONS.VIEW',
								path:		'symptom-checks/:id',
								icon:		'view',
								role:		'details' as const,
								position:	1
							}
						]

@NgModule({
	declarations: [
		SymptomCheckViewPage
	],
	imports: [
		SharedModule,
		QuestionaireModule,
		RouterModule.forChild(routes),
		SymptomCheckMetaStoreModule.forChild(null, actions),
		TranslationsModule.forChild("SYMPTOM_CHECKS_VIEW", {en, de})
	],
	exports: [
		SymptomCheckViewPage
	]
})
export class SymptomCheckViewModule { 

}
