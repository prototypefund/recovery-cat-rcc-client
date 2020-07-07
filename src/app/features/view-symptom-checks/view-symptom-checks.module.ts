import 	{ 	NgModule 					}	from '@angular/core'
import 	{ 	RouterModule 				}	from '@angular/router'


import	{	SharedModule,
			MetaStoreModule	
		}									from '@rcc/common'


import	{	QuestionaireModule			}	from '@rcc/features/questionaire'

import	{	SymptomCheckMetaStoreModule	}	from '@rcc/features/symptom-check-meta-store'

import	{	ViewSymptomCheckPage		}	from './view-symptom-check.page/view-symptom-check.page'


const routes 		=	[
							{ path: 'symptomchecks/:id',	component: ViewSymptomCheckPage	},
						]


const actions		=	[
							{ 
								label: 	'VIEW_SYMPTOM_CHECKS.ACTIONS.VIEW',
								path:	'symptomchecks/:id',
								icon:	'view'
							}
						]

@NgModule({
	declarations: [
		ViewSymptomCheckPage
	],
	imports: [
		SharedModule,
		QuestionaireModule,
		RouterModule.forChild(routes),
		SymptomCheckMetaStoreModule.forChild(null, actions)
	],
	exports: [
		ViewSymptomCheckPage
	]
})
export class ViewSymptomChecksModule { 

}
