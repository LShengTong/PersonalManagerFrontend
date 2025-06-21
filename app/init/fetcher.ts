import {DataRegularOption} from "@/app/schedule/data/dataRegularOption";
import {DataDailySchedule} from "@/app/schedule/data/dataDailySchedule";
import {DataDailyTask} from "@/app/task/data/dataDailyTask";
import {DataTask} from "@/app/task/data/dataTask";
import {config} from "@/app/common/config";

export class Fetcher {
    static async init() {
        return fetch(config.backend + "init").then(
            res => res.json()
        ).then(
            data => {
                return data as {
                    regularSchedules: DataRegularOption[],
                    dailySchedules: DataDailySchedule[],
                    dailyTasks: DataDailyTask[],
                    tasks: DataTask[]
                };
            }
        )
    }
}