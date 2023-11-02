import React from "react"

interface TopPanelInfoProps {
    text: string;
    displayCondition?: boolean;
}

export const TopPanelInfo = React.memo(function loader({ text, displayCondition = true }: TopPanelInfoProps) {

    if (!displayCondition) {
        return <></>
    }

    return (
        <div className="bg-indigo-900 text-center py-4 lg:px-4">
            <div className="p-2 bg-indigo-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                <svg className="flex rounded-full bg-indigo-500 uppercase px-2 py-1 text-xs font-bold mr-3" fill="#000000" height="30px" width="30px" version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360">
                    <g>
                        <polygon points="153.202,269.056 188.979,286.944 260.723,143.459 178.879,159.828 223.368,93.094    190.087,70.906 92.03,217.99 188.369,198.722  " />
                        <path d="M360,0H0v360h360V0z M320,320H40V40h280V320z" />
                    </g>
                </svg>
                <span className="font-semibold mr-2 text-left flex-auto">{text}</span>
                {/* <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg> */}
            </div>
        </div>
    )
})