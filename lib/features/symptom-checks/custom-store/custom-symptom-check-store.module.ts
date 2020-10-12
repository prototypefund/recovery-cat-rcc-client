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

import	{	CustomSymptomCheckStore			}		from './custom-symptom-check-store.service'

import	{	ScheduleModalComponent			}		from './schedule-modal/schedule-modal.component'

import	en	from './i18n/en.json'
import	de	from './i18n/de.json'


const routes 		=	[
							{ path: 'symptom-checks/custom/:id',	component: SymptomCheckEditPage },							
							{ path: 'symptom-checks/custom',		component: SymptomCheckEditPage },
						]

// @Component({
// 	template:	`
// 					<ion-item routerLink = "symptom-checks/custom">
// 						<ion-label>{{ "CUSTOM_SYMPTOM_CHECK_STORE.MENU_ENTRY" | translate }}</ion-label>
// 					</ion-item>
// 				`
// })
// export class MenuEntryCustomSymptomCheck {}

// const menuEntries	=	[
// 							MenuEntryCustomSymptomCheck
// 						]


const itemActions 		= 	[
								{
									label: 			'CUSTOM_SYMPTOM_CHECK_STORE.ACTIONS.DELETE',
									store: 			CustomSymptomCheckStore,
									handler: 		(item: any, store: any) => store.deleteSymptomCheck(item),
									icon:			'delete',
									successMessage:	'CUSTOM_SYMPTOM_CHECK_STORE.ACTIONS.DELETE_SUCCESS',
									role:			'destructive' as const

								},
								{
									label: 			'CUSTOM_SYMPTOM_CHECK_STORE.ACTIONS.EDIT',
									store: 			CustomSymptomCheckStore,
									path:			'symptom-checks/custom/:id',
									icon:			'edit'
								},
								{
									label: 			'CUSTOM_SYMPTOM_CHECK_STORE.ACTIONS.CREATE_NEW_FROM',
									path:			'symptom-checks/custom/:id',
									icon:			'create-from'
								}
							]

const metaActions		=	[
								{
									label:			'CUSTOM_SYMPTOM_CHECK_STORE.ACTIONS.CREATE',
									role:			'productive' as const,
									icon:			'new',
									path:			'symptom-checks/custom'
								}
							]


@NgModule({
	declarations: [
		// MenuEntryCustomSymptomCheck,
		SymptomCheckEditPage,
		ScheduleModalComponent
	],
	imports: [
		SharedModule,
		TranslationsModule.forChild('CUSTOM_SYMPTOM_CHECK_STORE', { en, de} ),
		RouterModule.forChild(routes),
		// MainMenuModule.forChild(menuEntries),
		SymptomCheckMetaStoreModule.forChild([CustomSymptomCheckStore], itemActions, metaActions),
		DevModule.note('CustomSymptomCheckStoreModule')
	],
	exports: [
		// MenuEntryCustomSymptomCheck,
		SymptomCheckEditPage,
		ScheduleModalComponent
	],
	providers:[
		CustomSymptomCheckStore,
	]
})
export class CustomSymptomCheckStoreModule { }