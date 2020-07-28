import	{	NgModule		}	from '@angular/core'
import	{	IconsModule		}	from '@rcc/common'



@NgModule({
	declarations: [],
	imports: [
		IconsModule.forChild({
			'add':				'add-outline',
			'create-from':		'copy-outline',
			'delete':			'trash-outline',
			'edit':				'pencil',
			'question':			'help-circle-outline',
			'remove':			'close',
			'revert':			'refresh-outline',
			'select-items':		'list-outline',
			'symptom-check': 	'list-circle-outline',
			'schedule':			'time-outline',
			'time':				'time-outline',
			'view':				'eye-outline',
			'new':				'add-putline',
			'fill':				'create-outline',
			'share':			'share-outline',
		})
	]
})
export class IonicIconsModule { }
