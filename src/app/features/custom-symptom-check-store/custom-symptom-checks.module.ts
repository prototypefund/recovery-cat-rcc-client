import 	{ 	
			NgModule,
			Component,
		} 										from '@angular/core'

import	{
			RouterModule, 				
		}										from '@angular/router'

import	{	ReactiveFormsModule			}		from '@angular/forms'

import	{
			SharedModule,
			MainMenuModule,
			TranslationsModule,
			DevModule
		}										from '@rcc/common'

import	{
			SymptomCheckMetaStoreModule
		}										from '@rcc/features/symptom-check-meta-store'

import	{	CustomSymptomCheckPage		}		from './custom-symptom-check.page/custom-symptom-check.page'

import	{	CustomSymptomCheckStore		}		from './custom-symptom-check-store.service'

import	{	ScheduleModal				}		from './schedule.modal/schedule.modal'

import	en	from './i18n/en.json'
import	de	from './i18n/de.json'


const routes 		=	[
							{ path: 'symptom-checks/custom/:id',	component: CustomSymptomCheckPage },							
							{ path: 'symptom-checks/custom',		component: CustomSymptomCheckPage },
						]

@Component({
	template:	`
					<ion-item routerLink = "symptom-checks/custom">
						<ion-label>{{ "CUSTOM_SYMPTOM_CHECKS.MENU_ENTRY" | transloco }}</ion-label>
					</ion-item>
				`
})
export class MenuEntryCustomSymptomCheck {}

const menuEntries	=	[
							MenuEntryCustomSymptomCheck
						]


const itemActions 		= 	[
								{
									label: 			'CUSTOM_SYMPTOM_CHECKS.ACTIONS.DELETE',
									store: 			CustomSymptomCheckStore,
									handler: 		(item: any, store: any) => store.delete(item),
									icon:			'remove',
									successMessage:	'CUSTOM_SYMPTOM_CHECKS.ACTIONS.DELETE_SUCCESS'

								},
								{
									label: 		'CUSTOM_SYMPTOM_CHECKS.ACTIONS.EDIT',
									store: 		CustomSymptomCheckStore,
									path:		'symptom-checks/custom/:id',
									icon:		'edit'
								},
								{
									label: 		'CUSTOM_SYMPTOM_CHECKS.ACTIONS.CREATE_NEW_FROM',
									path:		'symptom-checks/custom/:id',
									icon:		'create-from'
								}
							]


@NgModule({
	declarations: [
		MenuEntryCustomSymptomCheck,
		CustomSymptomCheckPage,
		ScheduleModal
	],
	imports: [
		SharedModule,
		TranslationsModule.forChild('CUSTOM_SYMPTOM_CHECKS', { en, de} ),
		RouterModule.forChild(routes),
		MainMenuModule.forChild(menuEntries),
		SymptomCheckMetaStoreModule.forChild([CustomSymptomCheckStore], itemActions),
		ReactiveFormsModule,
		DevModule.note('CustomSymptomCheckStoreModule')
	],
	exports: [
		MenuEntryCustomSymptomCheck,
		CustomSymptomCheckPage,
		ScheduleModal
	],
	providers:[
		CustomSymptomCheckStore,
	]
})
export class CustomSymptomCheckStoreModule { }