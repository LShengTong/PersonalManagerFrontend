'use client'

import {ScheduleUpdateView} from "@/app/schedule/updateView/scheduleUpdateView";
import {DelayView} from "@/app/schedule/view/delayView";
import {useDispatch, useSelector} from "react-redux";
import {DataDailySchedule} from "@/app/schedule/data/dataDailySchedule";
import {Time} from "@/app/schedule/pojo/time";
import {setTimes} from "@/app/schedule/slice/scheduleSlice";
import {ScheduleFetcher} from "@/app/schedule/fetcher/scheduleFetcher";
import {RootState} from "@/app/common/store";

export const SchedulesUpdateView = () => {
    const dispatch = useDispatch();
    const scheduleRecord = useSelector((state: RootState) => state.schedule.dailyScheduleRecord);
    const schedules = Object.values(scheduleRecord);
    const sortedSchedules = schedules.sort((a, b) => {
        return new Time(a.time.hour, a.time.minute).compare(new Time(b.time.hour, b.time.minute));
    })
    const scheduleIds = sortedSchedules.map(schedule => schedule.id);

    const onDelay = (minute: number) => {
        const newSchedules: DataDailySchedule[] = []
        for(const schedule of schedules) {
            const newTime = new Time(schedule.time.hour, schedule.time.minute);
            newTime.addMinutes(minute);
            newSchedules.push(
                {id: schedule.id, regularScheduleId: schedule.regularScheduleId, time: {hour: newTime.hour, minute: newTime.minute}}
            )
        }
        ScheduleFetcher.updateDailySchedules(newSchedules).then(data => {
            if(data) dispatch(setTimes(newSchedules));
        })
    }

    return (
        <div className={'relative items-center space-x-2'}>
            <ul className={'space-y-2'}>
                {scheduleIds.map((scheduleId) => (
                    <li key={scheduleId}>
                        <ScheduleUpdateView scheduleId={scheduleId}></ScheduleUpdateView>
                    </li>
                ))}
            </ul>
            <hr className="my-4 border-t-2 border-gray-300"/>
            <DelayView onDelay={onDelay}></DelayView>
        </div>
    )
}