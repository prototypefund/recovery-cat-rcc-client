import 	{ 	NgModule 					}	from '@angular/core'
import 	{ 	RouterModule 				}	from '@angular/router'


import	{	
			SharedModule,
			MetaStoreModule	
		}									from '@rcc/common'


import	{	QuestionaireModule			}	from '@rcc/features/questionaire'

import	{	SymptomCheckMetaStoreModule	}	from '@rcc/features/symptom-checks/meta-store'

import	{	SymptomCheckViewPage		}	from './view-page/view-page.component'


const routes 		=	[
							{ path: 'symptom-checks/:id',	component: SymptomCheckViewPage	},
						]


const actions		=	[
							{ 
								label: 	'VIEW_SYMPTOM_CHECKS.ACTIONS.VIEW',
								path:	'symptom-checks/:id',
								icon:	'view'
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
		SymptomCheckMetaStoreModule.forChild(null, actions)
	],
	exports: [
		SymptomCheckViewPage
	]
})
export class SymptomCheckViewModule { 

}
