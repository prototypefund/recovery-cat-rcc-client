import	{	NgModule		}	from '@angular/core'
import	{	IconsModule		}	from '@rcc/common'



@NgModule({
	declarations: [],
	imports: [
		IconsModule.forChild({
			'back':				'arroq-back',
			'add':				'add-outline',
			'new':				'add-outline',
			'search':			'search-outline',
			'filter':			'search-outline',
			'create-from':		'duplicate-outline',

			'delete':			'trash-outline',
			'remove':			'close',
			'edit':				'pencil',
			'close':			'close',
			'revert':			'refresh-outline',
			'select-items':		'list-outline',
			'schedule':			'time-outline',
			'time':				'time-outline',
			'view':				'eye-outline',
			'fill':				'create-outline',
			'share':			'share-outline',
			'qr-code':			'qr-code-outline',
			'scan':				'qr-code-outline',
			'notification':		'notifications-outline',
			'actions':			'ellipsis-vertical',
			'active':			'checkmark',
			'home':				'home-outline',
			'menu':				'menu-outline',
			'next':				'caret-forward-outline',
			'previous':			'caret-back-outline',
			'pause':			'pause',
			'start':			'caret-forward-outline',
			'settings':			'settings-outline',
			'dev':				'bug-outline',
			'chart':			'analytics-outline',
			
			//Items:
			'entry':			'reader-outline',
			'question':			'help-circle-outline',
			'symptom-check': 	'list-circle-outline',
		})
	]
})
export class IonicIconsModule { }
