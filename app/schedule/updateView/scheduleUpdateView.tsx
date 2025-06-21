'use client'

import ScheduleNameView from "@/app/schedule/view/scheduleNameView";
import ScheduleTimeView from "@/app/schedule/view/scheduleTimeView";
import { useSelector, useDispatch } from 'react-redux'
import {AppDispatch, RootState} from "@/app/common/store";
import {ScheduleFetcher} from "@/app/schedule/fetcher/scheduleFetcher";
import {
    deleteDailySchedule,
    setDailySchedule,
    setRegularScheduleId,
    setTimes
} from "@/app/schedule/slice/scheduleSlice";
import {DataTime} from "@/app/schedule/data/dataTime";
import {Time} from "@/app/schedule/pojo/time";

interface ScheduleProps {
    scheduleId: number
}

export const ScheduleUpdateView = ({scheduleId}: ScheduleProps) => {
    const regularScheduleId = useSelector((state: RootState) => state.schedule.dailyScheduleRecord[scheduleId].regularScheduleId);
    const time = useSelector((state: RootState) => state.schedule.dailyScheduleRecord[scheduleId].time);
    const regularOptionRecord = useSelector((state: RootState) => state.schedule.regularOptionRecord);
    const name = regularOptionRecord[regularScheduleId]?.name;
    const regularOptions = Object.values(regularOptionRecord);
    const dispatch = useDispatch<AppDispatch>();

    const onOptionSelected = (newId: number) => {
        ScheduleFetcher.updateDailySchedules([{id: scheduleId, regularScheduleId: newId, time: time}]).then(data => {
            if(data) dispatch(setRegularScheduleId({id: scheduleId, regularScheduleId: newId}));
        })
    }

    const onTimeChange = (newTime: DataTime) => {
        ScheduleFetcher.updateDailySchedules([{id: scheduleId, regularScheduleId: regularScheduleId, time: newTime}]).then(data => {
            if(data) dispatch(setTimes([{id: scheduleId, time: newTime}]));
        })
    }

    const onClickDelete = () => {
        ScheduleFetcher.deleteDailySchedule(scheduleId).then(data => {
            if(data) dispatch(deleteDailySchedule(scheduleId));
        })
    }

    const onClickAdd = () => {
        ScheduleFetcher.addDailySchedule({id: 0, regularScheduleId: 1, time: time}).then(data => {
            dispatch(setDailySchedule({id: data, regularScheduleId: 1, time: time}));
        })
    }

    const isOverTime = () => new Time(time.hour, time.minute).compare(Time.now()) == -1;

    return (
        <div className={'flex items-center space-x-2'}>
            <ScheduleNameView
                name={name ? name : ""} onOptionSelected={onOptionSelected} regularOptions={regularOptions} overTime={isOverTime()}
            ></ScheduleNameView>
            <ScheduleTimeView
                time={time} onChange={onTimeChange}
            ></ScheduleTimeView>
            <button className={"bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"}
                onClick={onClickDelete}
            >x</button>
            <button className={"bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition duration-200"}
                    onClick={onClickAdd}
            >+</button>
        </div>
    )
}