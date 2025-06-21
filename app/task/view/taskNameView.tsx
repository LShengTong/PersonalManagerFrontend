import {DataTask} from "@/app/task/data/dataTask";
import {NameOptionView} from "@/app/common/nameOptionView";
import {ViewOption} from "@/app/common/optionView";

interface nameProps {
    name: string;
    tasks: DataTask[];
    onTaskSelected: (id: number) => void;
}

export const TaskNameView = ({name, tasks, onTaskSelected}: nameProps) => {
    const options: ViewOption[] = []
    tasks.forEach(task => {options.push({id: task.id, name: task.name})});
    return (
        <NameOptionView options={options} name={name}
                        btnClassName={"bg-gray-100 hover:bg-gray-200"} onOptionSelected={onTaskSelected}></NameOptionView>
    );
}