import 	{ 	
			Component, 
			OnInit
		}										from '@angular/core'

import	{
			mergeMap
		}										from 'rxjs/operators'

import	{
			Router,
			ActivatedRoute,
			ParamMap
		}										from '@angular/router'							

import	{	
			SymptomCheckMetaStore
		}										from '/symptom-checks/meta-store'

import	{
			SymptomCheck
		}										from '@rcc/core'

import	{	Questionaire					}	from 'questions'
import	{	WebsocketTransmissionService	}	from '/transmission'



@Component({
	templateUrl: 	'./demo.component.html',
	styleUrls: 		['./demo.component.scss'],
})
export class DemoScanPage  implements OnInit {

	public qr_data: any

	constructor(
		private questionaire					: Questionaire
	){}


// yyvhHuCuuKH+lOd9F+ls9kIxOqd1Jz2rohdm0mLLeRrCjv3cwpNhOTf/byvXNeO6d5A/7cLXmPP0Mzh4W7Ib9z5Phyd6WKtqNRifNjZtU6ENEIemTy6CfPHHil/nG6qsrO4o3arOCVFfhgPWcPqk4ZAui9hAkbLNtyYYiRa+BqyHWAZ9ciX6ehUUH0hwXIYkClv77p9ONhnrI2PZpTTQF1QGqqi75u5+z97gb8gZny6gGS4L+FqaH9kF5WCWauCZ6d4R2gHqU+s6YUeELr/EgsIS/mSsbqhyL1AzSVcl/fI3fOU4QYbIbwmRoZxRre+bk00Np5yTe5E+Nt0FpZ7DpwTTGb6jQfbS+ptdkIBd1mQxCS8i6hy69kZePS6qRbnhUHIG83IboyVFcrL2ExcFqrr9HE/II/HyEiA6eIzCWu8d3mGen/9vRMARzy+bGydDDync+P0adAKhBiGwlhbpTFTqUWNVuJroPLG7GBpg1fIYfB1XcqnlDqSmcaHluabX6z4=


	ngOnInit() {
		this.qr_data = JSON.stringify({
			channel: "demo-scan",
​			iv: "4UZe7mWlcEpRHR70",
​			key: "+GhORbtzwmB8OtyqTjvEaSlXFrpKNcBSxb2pE+Gpk6U=",
​			type: "WebsocketTransmission",
​			url: "wss://signal.recoverycat.de",
		})
  	}

}
