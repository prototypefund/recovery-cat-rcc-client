import 	{ 	
			NgModule, 
			Component
		} 								from '@angular/core'

import 	{ 	CommonModule } 				from '@angular/common'

import	{	IonicModule }				from '@ionic/angular'

import 	{ 	RouterModule } 				from '@angular/router'

import	{	MainMenuModule }			from '../main-menu/main-menu.module'

import	{	QuestionairePage }			from './questionaire.page/questionaire.page'

import	{	TranslocoRootModule }		from '../transloco-root.module'

const routes 		=	[
							{ path: 'questionaire',	component: QuestionairePage	},
						]

@Component({
	template:	'<ion-item routerLink = "questionaire"><ion-label>{{ "QUESTIONAIRE.MENU_ENTRY" | transloco }}</ion-label></ion-item>'
})
export class MenuEntryQuestionaire {}

const menuEntries	=	[
							MenuEntryQuestionaire
						]




@NgModule({
	declarations: [
		MenuEntryQuestionaire,
		QuestionairePage,
	],
	imports: [
		IonicModule,
		RouterModule.forChild(routes),
		MainMenuModule.forChild(menuEntries),
		TranslocoRootModule
	],

	exports: [
		MenuEntryQuestionaire,
		QuestionairePage
	]
})
export class QuestionaireModule { }
