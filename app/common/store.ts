import { configureStore } from '@reduxjs/toolkit'
import ScheduleReducer from '../schedule/slice/scheduleSlice'
import TaskReducer from '../task/slice/taskSlice'

export const store = configureStore({
    reducer: {
        schedule: ScheduleReducer,
        task: TaskReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch