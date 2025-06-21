import {NameOptionView} from "@/app/common/nameOptionView";
import {ViewOption} from "@/app/common/optionView";
import {DataRegularOption} from "@/app/schedule/data/dataRegularOption";

interface nameProps {
    regularOptions: DataRegularOption[];
    name: string;
    overTime: boolean;
    onOptionSelected: (id: number) => void;
}

const ScheduleNameView = ({name, overTime, regularOptions, onOptionSelected}: nameProps) => {
    const options: ViewOption[] = []
    regularOptions.forEach(option => {options.push({id: option.id, name: option.name})});
    return (
        <NameOptionView options={options} name={name} btnClassName={overTime ? `bg-gray-500 hover:bg-gray-600` : `bg-gray-100 hover:bg-gray-200`}
                        onOptionSelected={onOptionSelected}>
        </NameOptionView>
    );
}

export default ScheduleNameView