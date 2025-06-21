import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {DataDailyTask} from "@/app/task/data/dataDailyTask";
import {DataTask} from "@/app/task/data/dataTask";

interface TaskState {
    dailyTaskRecord: Record<number, DataDailyTask>,
    taskRecord: Record<number, DataTask>
}

const initialState: TaskState = {
    dailyTaskRecord: {},
    taskRecord: {},
}

export const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        setAll(state, action: PayloadAction<TaskState>) {
            return action.payload;
        },

        setDailyTasks(state, action: PayloadAction<Record<number, DataDailyTask>>) {
            state.dailyTaskRecord = action.payload
        },

        setDailyTask(state, action: PayloadAction<DataDailyTask>){
            state.dailyTaskRecord = {
                ...state.dailyTaskRecord,
                [action.payload.id]: action.payload
            }
        },

        deleteDailyTask(state, action: PayloadAction<number>) {
            state.dailyTaskRecord = {...state.dailyTaskRecord}
            delete state.dailyTaskRecord[action.payload]
        },
    },
})

export const { setAll, setDailyTasks, setDailyTask, deleteDailyTask } = taskSlice.actions
export default taskSlice.reducer