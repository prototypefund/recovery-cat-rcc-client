import	{
			Injectable, 
			Inject,
			Optional,
			OnDestroy
		}								from '@angular/core'

import	{	linkSubjects			}	from '@rcc/core'
import	{
			FormControl,
			FormArray
		}								from '@angular/forms'

import	{	Subscription			}	from 'rxjs'

import	{
			SettingConfig,
			SETTING_CONFIGS
		}								from './settings.commons'

@Injectable()
export class SettingsService implements OnDestroy {

	public settings			: any[]
	public subscriptions	: Subscription[] = []	

	constructor(
		@Optional() @Inject(SETTING_CONFIGS)
		public settingConfigs	: SettingConfig[]
	) {

		this.settings	= 	this.settingConfigs.map( config => {
								const fc = new FormControl()

								this.subscriptions.push(
									...linkSubjects(
										{
											subscribe: 	( ...args:any[] ) 	=> config.change$.subscribe(...args),
											next:		(value: any)		=> config.change$.next(value),
										}, 
										{
											subscribe: 	( ...args:any[] ) 	=> fc.valueChanges.subscribe(...args),
											next:		(value: any)		=> fc.setValue(value),
										}
									)
								)

								return 	{ 
											...config,
											formControl: fc
										}
							})

	}

	ngOnDestroy(){
		this.subscriptions.forEach( sub => sub.unsubscribe() )
	}
}
