import {useState} from "react";

interface delayProps {
    onDelay: (minute: number) => void;
}

export const DelayView = ({ onDelay }: delayProps) => {
    const [delayMinutes, setDelayMinutes] = useState(0);
    return (
        <div className={"flex items-center space-x-2"}>
            <span className="text-gray-700">全部推迟：</span>
            <input
                type="number"
                value={delayMinutes}
                className="px-3 w-24 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onChange={(e) => {
                    const minutes = Number(e.target.value);
                    setDelayMinutes(minutes);
                }}
            />
            <span className="text-gray-700">分钟</span>
            <button className={`p-2 w-16 h-10 rounded-md bg-gray-100 hover:bg-gray-200 border border-gray-300 flex items-center 
                    justify-center`} onClick={() => onDelay(delayMinutes)}>
                确认
            </button>
        </div>
    )
}