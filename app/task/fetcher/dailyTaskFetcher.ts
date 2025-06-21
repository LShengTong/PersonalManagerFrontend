import {DataDailyTask} from "@/app/task/data/dataDailyTask";
import {config} from "@/app/common/config";

export class DailyTaskFetcher {
    static async updateDailyTask(dailyTask: DataDailyTask) {
        return fetch(config.backend + "update_daily_task", {
            method: "POST",
            body: JSON.stringify(dailyTask),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            return res.ok;
        })
    }

    static async addDailyTask(taskId: number) {
        return fetch(config.backend + "add_today_task", {
            method: "POST",
            body: JSON.stringify(taskId),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json()).then(
            data => {
                return data as number;
            }
        )
    }

    static async deleteDailyTask(id: number){
        return fetch(config.backend + "delete_daily_task", {
            method: "POST",
            body: JSON.stringify(id),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            return res.ok;
        })
    }
}