import {DataTime} from "@/app/schedule/data/dataTime";

export interface DataDailySchedule {
    id: number
    regularScheduleId: number
    time: DataTime
}