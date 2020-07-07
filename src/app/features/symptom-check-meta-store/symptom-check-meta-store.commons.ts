import	{	InjectionToken 	}		from "@angular/core"
import 	{
			SymptomCheck,
			SymptomCheckConfig,
			ItemStore,
		}							from '@rcc/core'

import	{	ItemAction		}		from '@rcc/common'



export const SYMPTOM_CHECK_STORES 		= new InjectionToken<ItemStore<SymptomCheckConfig, SymptomCheck>>('SymptomCheck Stores')
export const SYMPTOM_CHECK_ACTIONS 		= new InjectionToken<ItemAction<SymptomCheck>>('Routes with SymptomCheck id, represented as :id, plus label for actions menu and optional icon name, optional handler')
