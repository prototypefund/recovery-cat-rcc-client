import	{	NgModule		}	from '@angular/core'
import	{	IconsModule		}	from '@rcc/common'



@NgModule({
	declarations: [],
	imports: [
		IconsModule.forChild({
			'add':				'add-outline',
			'create-from':		'duplicate-outline',
			'delete':			'trash-outline',
			'edit':				'pencil',
			'remove':			'close',
			'revert':			'refresh-outline',
			'select-items':		'list-outline',
			'schedule':			'time-outline',
			'time':				'time-outline',
			'view':				'eye-outline',
			'new':				'add-putline',
			'fill':				'create-outline',
			'share':			'share-outline',
			'qr-code':			'qr-code-outline',

			//Items:
			'entry':			'reader-outline',
			'question':			'help-circle-outline',
			'symptom-check': 	'list-circle-outline',
		})
	]
})
export class IonicIconsModule { }
