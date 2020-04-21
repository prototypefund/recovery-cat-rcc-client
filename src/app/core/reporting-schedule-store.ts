import	{	
			Item,
			ItemStore 
		}						from "./item-store"


export interface ReportingScheduleConfig {
	
}


export class ReportingSchedule extends Item {

	get config(): ReportingScheduleConfig { return [] }
}


export class ReportingScheduleStore extends ItemStore<ReportingSchedule> {

}