import	{	NgModule						}	from '@angular/core'
import 	{ 	RouterModule 					}	from '@angular/router'
import	{	
			TranslationsModule,
			SharedModule,
			QrCodeModule,
			QrCodeService,				
		}										from '@rcc/common'

import	{	DemoScanPage					}	from './demo.component'



const routes 		=	[
							{ path: 'demo-scan',		component: 	DemoScanPage },
						]


const	actions	=	[
						{ 	
								label: 			'Demo Scan', 
								icon: 			'qr-code',
								path:			'/demo-scan',
						},
					]
	
@NgModule({
	declarations: [
		DemoScanPage
	],
	imports: [
		SharedModule,
		QrCodeModule,	
		RouterModule.forChild(routes)
	]
})
export class DemoScanModule { 

}
