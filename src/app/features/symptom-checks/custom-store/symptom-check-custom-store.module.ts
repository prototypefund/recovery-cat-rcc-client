import 	{ 	
			NgModule,
			Component,
		} 											from '@angular/core'

import	{
			RouterModule, 				
		}											from '@angular/router'

import	{	ReactiveFormsModule				}		from '@angular/forms'

import	{
			SharedModule,
			MainMenuModule,
			TranslationsModule,
			DevModule
		}											from '@rcc/common'

import	{
			SymptomCheckMetaStoreModule
		}											from '@rcc/features/symptom-checks/meta-store'

import	{	SymptomCheckEditPage			}		from './edit-page/edit-page.component'

import	{	SymptomCheckCustomStore			}		from './symptom-check-custom-store.service'

import	{	ScheduleModalComponent			}		from './schedule-modal/schedule-modal.component'

import	en	from './i18n/en.json'
import	de	from './i18n/de.json'


const routes 		=	[
							{ path: 'symptom-checks/custom/:id',	component: SymptomCheckEditPage },							
							{ path: 'symptom-checks/custom',		component: SymptomCheckEditPage },
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
									store: 			SymptomCheckCustomStore,
									handler: 		(item: any, store: any) => store.delete(item),
									icon:			'remove',
									successMessage:	'CUSTOM_SYMPTOM_CHECKS.ACTIONS.DELETE_SUCCESS'

								},
								{
									label: 		'CUSTOM_SYMPTOM_CHECKS.ACTIONS.EDIT',
									store: 		SymptomCheckCustomStore,
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
		SymptomCheckEditPage,
		ScheduleModalComponent
	],
	imports: [
		SharedModule,
		TranslationsModule.forChild('SYMPTOM_CHECKS_CUSTOM', { en, de} ),
		RouterModule.forChild(routes),
		MainMenuModule.forChild(menuEntries),
		SymptomCheckMetaStoreModule.forChild([SymptomCheckCustomStore], itemActions),
		DevModule.note('CustomSymptomCheckStoreModule')
	],
	exports: [
		MenuEntryCustomSymptomCheck,
		SymptomCheckEditPage,
		ScheduleModalComponent
	],
	providers:[
		SymptomCheckCustomStore,
	]
})
export class CustomSymptomCheckStoreModule { }