'use client'

import {useState} from "react";
import {OptionView, ViewOption} from "@/app/common/optionView";

interface nameOptionProps {
    options: ViewOption[];
    name: string;
    btnClassName?: string;
    onOptionSelected: (id: number) => void;
}

export const NameOptionView = ({name, btnClassName, options, onOptionSelected}: nameOptionProps) => {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className={"relative w-48"}>
            <button
                className={`p-2 w-full h-10 rounded-md border border-gray-300 flex items-center justify-center ` + btnClassName}
                onClick={() => setIsOpen(!isOpen)}
            >
                {name}
            </button>
            {isOpen && (
                <OptionView options={options} onSelected={(id) => {
                    setIsOpen(!isOpen)
                    onOptionSelected(id)
                }}></OptionView>
            )}
        </div>
    )
}