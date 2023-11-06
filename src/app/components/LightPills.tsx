import { useState } from "react";
import { Item } from "../types";


interface LightPillsProp<T = string> {
    items: Item<T>[];
    activeValue: string;
    onClickHandler: (value: T) => void;
}

export const LightPills = <T extends string>({ items, activeValue, onClickHandler }: LightPillsProp<T>) => {

    const [localActiveValue, setLocalActiveValue] = useState<string | undefined>(undefined);

    return (
        <select
            className="outline-none bg-white px-2 text-l hover:text-purple-600"
            value={localActiveValue || activeValue}
            onChange={(e: any) => {
                e.preventDefault();
                setLocalActiveValue(e.target.value);
                onClickHandler(e.target.value);
            }}
        >
            {items.map(({ title, value }, i) => (
                <option value={value} key={i}>
                    {title}
                </option>
            ))}
        </select >
    )
}