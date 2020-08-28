import	{ 
			NgModule,
			Component 
		} 								from '@angular/core'

import	{	NoopAnimationsModule	}	from '@angular/platform-browser/animations'

import	{	RouterModule			}	from '@angular/router'

import	{	NgxChartsModule			}	from '@swimlane/ngx-charts'

import	{	
			SharedModule,
			TranslationsModule,
			MainMenuModule,			
		}								from '@rcc/common'

import	{	ChartWidgetComponent	}	from './chart-widget/chart-widget.component'
import	{	ChartPage				}	from './chart-page/chart-page.component'




import en from './i18n/en.json'
import de from './i18n/de.json'


@Component({
	template:	`
					<ion-item routerLink = "charts/B">
						<ion-label>{{ "CHARTS.MENU_ENTRY" | translate }}</ion-label>
						<ion-icon [name] = "'chart' | rccIcon" slot = "end"></ion-icon>
					</ion-item>
				`
})
export class MenuEntryCharts {}


const entries		=	[
							MenuEntryCharts
						]
	
const routes		=	[
							{
								path: 		'charts/:id',
								component:	ChartPage
							}
						]


@NgModule({
	declarations: [
		MenuEntryCharts,
		ChartPage,
		ChartWidgetComponent
	],
	imports: [
		SharedModule,
		TranslationsModule.forChild("CHARTS", {en, de}),
		MainMenuModule.forChild(entries),
		RouterModule.forChild(routes),
		NgxChartsModule,
		NoopAnimationsModule
	]
})
export class ChartsModule { }
