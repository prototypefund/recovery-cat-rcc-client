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
import	{	SymptomCheckMetaStoreModule		}	from '@rcc/features/symptom-checks/meta-store'
import	{	SymptomCheckSharePage			}	from './share-page/share-page.component'

import en from './i18n/en.json'
import de from './i18n/de.json'


const routes 		=	[
							{ path: 'symptom-checks/:id/share',	component: SymptomCheckSharePage },
						]


const	actions	=	[
						{ 	
								label: 			'SYMPTOM_CHECK_SHARING.SHARE', 
								icon: 			'share',
								path:			'/symptom-checks/:id/share',
						}
					]
	
@NgModule({
	declarations: [
		SymptomCheckSharePage
	],
	imports: [
		SharedModule,
		QrCodeModule,		
		SymptomCheckMetaStoreModule.forChild(null, actions),
		TranslationsModule.forChild('SYMPTOM_CHECK_SHARE', { en, de} ),
		RouterModule.forChild(routes)
	]
})
export class SymptomCheckShareModule { 

}
