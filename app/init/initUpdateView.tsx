'use client'

import {useEffect} from "react";
import {Fetcher} from "@/app/init/fetcher";
import {useDispatch} from "react-redux";
import {setAll as setAllTask} from "@/app/task/slice/taskSlice";
import {setAll as setAllSchedule} from "@/app/schedule/slice/scheduleSlice";
import {SchedulesUpdateView} from "@/app/schedule/updateView/schedulesUpdateView";
import {TasksUpdateView} from "@/app/task/updateView/tasksUpdateView";

export const InitUpdateView = () => {
    const dispatcher = useDispatch();

    useEffect(() => {
         function toRecord<T extends {id: number}>(array: T[]){
            const record: Record<number, T> = [];
            array.forEach(elem => record[elem.id] = elem);
            return record;
        }

        Fetcher.init().then(data => {
            dispatcher(setAllTask({
                taskRecord: toRecord(data.tasks),
                dailyTaskRecord: toRecord(data.dailyTasks),
            }));
            dispatcher(setAllSchedule({
                dailyScheduleRecord: toRecord(data.dailySchedules),
                regularOptionRecord: toRecord(data.regularSchedules)
            }));
        })
    }, [dispatcher]);

    return (
        <div>
            <SchedulesUpdateView></SchedulesUpdateView>
            <hr className="border-black border-t-4 my-4"/>
            <TasksUpdateView></TasksUpdateView>
        </div>
    )
}