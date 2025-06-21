import {DataDailySchedule} from "@/app/schedule/data/dataDailySchedule";
import {config} from "@/app/common/config";

export class ScheduleFetcher {
    static async updateDailySchedules(dailySchedule: DataDailySchedule[]) {
        return fetch(config.backend + "update_daily_schedules",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dailySchedule)
            }
        ).then(
            res => {return res.ok;}
        )
    }

    static async deleteDailySchedule(id: number){
        return fetch(config.backend + "delete_daily_schedule",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(id)
            }
        ).then(
            res => {return res.ok;}
        )
    }

    static async addDailySchedule(dailySchedule: DataDailySchedule){
        return fetch(config.backend + "add_today_schedule", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dailySchedule)
        }
        ).then(
            res => res.json()
        ).then(data => {
            return data as number
        })
    }
}