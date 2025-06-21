import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DataDailySchedule} from "@/app/schedule/data/dataDailySchedule";
import {DataTime} from "@/app/schedule/data/dataTime";
import {DataRegularOption} from "@/app/schedule/data/dataRegularOption";

interface ScheduleState {
    dailyScheduleRecord: Record<number, DataDailySchedule>
    regularOptionRecord: Record<number, DataRegularOption>
}

const initialState: ScheduleState = {
    dailyScheduleRecord: {},
    regularOptionRecord: {}
}

export const scheduleSlice = createSlice({
    name: 'schedule',
    initialState,
    reducers: {
        setAll(state, action: PayloadAction<ScheduleState>) {
            return action.payload;
        },

        setTimes(state, action: PayloadAction<{id: number, time: DataTime}[]>) {
            state.dailyScheduleRecord = {...state.dailyScheduleRecord}
            for(const change of action.payload) {
                const oldDailySchedule = state.dailyScheduleRecord[change.id];
                state.dailyScheduleRecord[change.id] = {...oldDailySchedule, time: change.time}
            }
        },

        setRegularScheduleId(state, action: PayloadAction<{id: number, regularScheduleId: number}>) {
            const oldDailySchedule = state.dailyScheduleRecord[action.payload.id];
            state.dailyScheduleRecord = {
                ...state.dailyScheduleRecord,
                [action.payload.id]: {...oldDailySchedule, regularScheduleId: action.payload.regularScheduleId}
            }
        },

        setDailySchedule(state, action: PayloadAction<DataDailySchedule>){
            state.dailyScheduleRecord = {
                ...state.dailyScheduleRecord,
                [action.payload.id]: action.payload
            }
        },

        deleteDailySchedule(state, action: PayloadAction<number>) {
            state.dailyScheduleRecord = {...state.dailyScheduleRecord}
            delete state.dailyScheduleRecord[action.payload]
        },
    },
})

export const { setAll, setTimes, setRegularScheduleId, setDailySchedule, deleteDailySchedule } = scheduleSlice.actions
export default scheduleSlice.reducer