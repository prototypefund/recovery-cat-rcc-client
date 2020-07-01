// Let child modules handle normal routes, only most basic config in here


import	{	NgModule } 									from '@angular/core'

import	{	PreloadAllModules, 
			RouterModule 
		} 												from '@angular/router'

const routes = 	[
					{ path: '**', redirectTo: ''  }
				]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
