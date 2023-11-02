import { Item } from "../types";


interface PillsProp<T = string> {
    items: Item<T>[];
    activeValue: string;
    onClickHandler: (value: T) => void
}

export const Pills = <T extends string>({ items, activeValue, onClickHandler }: PillsProp<T>) => {
    return (
        <nav className="relative z-0 flex border rounded-xl overflow-hidden dark:border-gray-700" aria-label="Tabs" role="tablist">
            {
                items.map(({ title, value }, index) => {
                    return (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onClickHandler(value)}
                            className={`${activeValue === value ? "border-b-blue-600 text-gray-900 dark:text-white dark:border-b-blue-600" : ""} relative min-w-0 flex-1 bg-white first:border-l-0 border-l border-b-2 py-2 px-2 text-gray-500 hover:text-gray-700 text-sm font-medium text-center overflow-hidden hover:bg-gray-50 focus:z-10 dark:bg-gray-800 dark:border-l-gray-700 dark:border-b-gray-700 dark:hover:bg-gray-700 dark:hover:text-gray-400 active`}
                            role="tab">
                            {title || value}
                        </button>
                    )
                })
            }
        </nav>
    )
}