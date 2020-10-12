import 	{ 	
			NgModule,
			Component 			
		}								from '@angular/core'

import	{	RouterModule			}	from '@angular/router'
			
import	{	ReactiveFormsModule		}	from '@angular/forms'

import 	{ 	
			SharedModule,
			MainMenuModule,
			TranslationsModule			
		}								from '@rcc/common'

import	{	CustomQuestionEditPage	}	from './edit-page/edit-page.component'
import	{	CustomQuestionStore		}	from './custom-question-store.service'
import	{	QuestionaireModule		}	from '../questionaire'

import	de from './i18n/de.json'
import	en from './i18n/en.json'


const routes 		=	[
							{ path: 'questionaire/custom',	component: CustomQuestionEditPage },
						]


//TODO: Link to MetaStore? maybe create Pipe?
// @Component({
// 	template:	`
// 					<ion-item routerLink = "questionaire/custom">
// 						<ion-label>{{ "CUSTOM_QUESTION_STORE.MENU_ENTRY" | translate }}</ion-label>
// 					</ion-item>
// 				`
// })
// export class MenuEntryCustomQuestion {}

// const menuEntries	=	[
// 							MenuEntryCustomQuestion
// 						]


const itemActions 		= 	[
								{
									label: 		'DELETE',
									store: 		CustomQuestionStore,
									handler: 	(item: any, store: any) => store.delete(item),
									icon:		'delete',
									role:		"destructive" as const
								}
							]

const metaActions		=	[
								{
									label:		'CUSTOM_QUESTION_STORE.ACTIONS.CREATE',
									icon:		'new',
									path:		'questionaire/custom', //TODO: Link to MetaStore? maybe create Pipe?
									role:		'productive' as const
								}
							]


@NgModule({
	declarations: [
		// MenuEntryCustomQuestion,
		CustomQuestionEditPage
	],
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		// MainMenuModule.forChild(menuEntries),
		QuestionaireModule.forChild([CustomQuestionStore], itemActions, metaActions),
		TranslationsModule.forChild('CUSTOM_QUESTION_STORE', {de, en}),
		ReactiveFormsModule
	],
	exports: [
	],
	providers:[
		CustomQuestionStore,
	]
})
export class CustomQuestionStoreModule { }
