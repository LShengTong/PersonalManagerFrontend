export interface ViewOption {
    id: number;
    name: string;
}

interface OptionProps {
    options: ViewOption[]
    onSelected: (id: number) => void
}

export const OptionView = ({options, onSelected}: OptionProps) => {
    return (
        <div className={"absolute w-full z-10 mt-1 bg-white border rounded-md shadow-lg"}>
            {options.map((option) => (
                <div
                    key={option.id}
                    className={`p-2 hover:bg-gray-100 cursor-pointer bg-blue-50`}
                    onClick={() => onSelected(option.id)}
                >
                    {option.name}
                </div>
            ))}
        </div>
    )
}