import	{	NgModule						}	from '@angular/core'
import 	{ 	RouterModule 					}	from '@angular/router'
import	{	
			TranslationsModule,
			SharedModule,
			QrCodeModule,
			QrCodeService,				
		}										from '@rcc/common'

import	{	
			SymptomCheck,
			SymptomCheckStore,
		}										from '@rcc/core'
import	{	WebsocketTransmissionModule		}	from '../../transmission'
import	{	
			SymptomCheckHomePath,
			SymptomCheckMetaStoreModule		
		}										from '../../symptom-checks/meta-store'
import	{	
			SymptomCheckResolver,
			SymptomCheckSharePage			
		}										from './share-page/share-page.component'


import en from './i18n/en.json'
import de from './i18n/de.json'


const routes 		=	[							
							{ 
								path: 		`${SymptomCheckHomePath}/:id/share`,		
								component: 	SymptomCheckSharePage,
								resolve:	{
												symptomCheck: SymptomCheckResolver
											}
							},
						]


const	actions		=	[
							{ 	
								label: 		'SYMPTOM_CHECK_SHARE.ACTIONS.SHARE', 
								icon: 		'qr-code',
								path:		`${SymptomCheckHomePath}/:id/share`,
								role:		'share' as const
							},
						]
	
@NgModule({
	providers:[
		SymptomCheckResolver
	],
	declarations: [
		SymptomCheckSharePage
	],
	imports: [
		SharedModule,
		QrCodeModule,	
		WebsocketTransmissionModule,	
		SymptomCheckMetaStoreModule.forChild(null, actions),
		TranslationsModule.forChild('SYMPTOM_CHECK_SHARE', { en, de} ),
		RouterModule.forChild(routes)
	]
})
export class SymptomCheckShareModule { 

}
