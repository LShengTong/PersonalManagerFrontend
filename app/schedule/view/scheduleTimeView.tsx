import {DataTime} from "@/app/schedule/data/dataTime";

interface TimeProp {
    time: DataTime;
    onChange: (time: DataTime) => void;
}

const ScheduleTimeView = ({time, onChange}: TimeProp) => {
    const className = "px-3 w-16 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    return (
        <div className="flex items-center space-x-2">
            <input
                type="number"
                value={time.hour.toString().padStart(2, '0')}
                className={className}
                onChange={(e) => {
                    let hour = Number(e.target.value);
                    hour = Math.min(23, Math.max(hour, 0));
                    const newTime = {hour: hour, minute: time.minute}
                    newTime.hour = hour
                    newTime.minute = time.minute
                    onChange(newTime)
                }}
            />
            <span className="text-gray-700">:</span>
            <input
                type="number"
                value={time.minute.toString().padStart(2, '0')}
                className={className}
                onChange={(e) => {
                    let minute = Number(e.target.value);
                    minute = Math.min(59, Math.max(minute, 0));
                    const newTime = {hour: time.hour, minute: minute}
                    onChange(newTime)
                }}
            />
        </div>
    )
}

export default ScheduleTimeView