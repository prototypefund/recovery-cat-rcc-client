// Let child modules handle normal routes, only most basic config in here


import	{	NgModule } 									from '@angular/core'

import	{	PreloadAllModules, 
			RouterModule 
		} 												from '@angular/router'

@NgModule({
	imports: [
		RouterModule.forRoot([], { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
