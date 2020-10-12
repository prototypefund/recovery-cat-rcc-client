import	{	
			Injectable,
			OnDestroy			
		}							from '@angular/core'

import	{	linkSubjects		}	from '@rcc/core'

import 	{	TranslocoService	}	from '@ngneat/transloco'

import	{	
			BehaviorSubject,
			Subscription			
		}							from 'rxjs'

@Injectable()
export class RccTranslationService implements OnDestroy {

	public activeLanguageChange$ 	: BehaviorSubject<any>
	private subscriptions			: Subscription[]		= []

	constructor(
		private translocoService: TranslocoService 
	){

		this.activeLanguageChange$ = new BehaviorSubject( this.translocoService.getActiveLang() )

		this.subscriptions.push(
			...linkSubjects(
				{
					subscribe: 	(...args:any[]) =>  translocoService.langChanges$.subscribe(...args),
					next:		(value:any) 	=>  this.translocoService.setActiveLang(value)
				},
				this.activeLanguageChange$
			)
		)

	}

	public setActiveLanguage( lang: string ){
		
		this.translocoService.setActiveLang(lang)
		return this
	}

	public translate(str: string){
		return this.translocoService.translate(str)
	}

	public getAvailableLanguages(): any[] {
		return this.translocoService.getAvailableLangs()
	}


	ngOnDestroy(){
		this.subscriptions.forEach( sub => sub.unsubscribe())
	}
}



