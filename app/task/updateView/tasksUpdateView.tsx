'use client'

import {TaskNameView} from "@/app/task/view/taskNameView";
import {useDispatch, useSelector} from "react-redux";
import {DailyTaskFetcher} from "@/app/task/fetcher/dailyTaskFetcher";
import {deleteDailyTask, setDailyTask} from "@/app/task/slice/taskSlice";
import {RootState} from "@/app/common/store";

export const TasksUpdateView = () => {
    const dispatch = useDispatch();
    const dailyTaskRecord = useSelector((state: RootState) => state.task.dailyTaskRecord);
    const dailyTaskIds = Object.keys(dailyTaskRecord).map(value => value as unknown as number);
    const taskRecord = useSelector((state: RootState) => state.task.taskRecord);
    const dailyTasks = Object.values(dailyTaskRecord);
    const taskIds = Object.keys(taskRecord).map(taskId => taskId as unknown as number);
    const tasks = Object.values(taskRecord);

    const onTaskSelected = (id: number, taskId: number) => {
        DailyTaskFetcher.updateDailyTask({id: id, taskId: taskId}).then((data) => {
            if(data) dispatch(setDailyTask({id: id, taskId: taskId}));
        })
    }

    const onClickAdd = () => {
        const existTaskIds: number[] = [];
        dailyTasks.forEach((dailyTask) => {
            existTaskIds.push(dailyTask.taskId);
        });
        const notExistTaskIds = taskIds.filter((taskId: number) => !existTaskIds.includes(taskId));
        const taskId = notExistTaskIds[Math.floor(Math.random() * notExistTaskIds.length)];
        DailyTaskFetcher.addDailyTask(taskId).then((data) => {
            if(data) dispatch(setDailyTask({id: data, taskId: taskId}));
        })
    }

    const onClickDelete = (id: number) => {
        DailyTaskFetcher.deleteDailyTask(id).then((data) => {
            if(data) dispatch(deleteDailyTask(id));
        })
    }

    const getName = (dailyTaskId: number) => {
        return taskRecord[dailyTaskRecord[dailyTaskId].taskId].name;
    }

    return (
        <div className={'relative items-center space-y-2 space-x-2'}>
            <ul className={'space-y-2'}>
                {dailyTaskIds.map((dailyTaskId) => (
                    <li className={'flex space-x-2'} key={dailyTaskId}>
                        <TaskNameView name={getName(dailyTaskId)} tasks={tasks}
                                      onTaskSelected={(taskId) => {onTaskSelected(dailyTaskId, taskId)}}>
                        </TaskNameView>
                        <button className={"bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition duration-200"}
                                onClick={() => {onClickDelete(dailyTaskId);}}
                        >x</button>
                    </li>
                ))}
            </ul>
            <button className={"bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition duration-200"}
                    onClick={onClickAdd}
            >+</button>
        </div>
    );
}