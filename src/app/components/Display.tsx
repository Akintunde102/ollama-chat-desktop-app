import React from 'react';

function JSONParse(jsonString: string) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return {};
    }
};

interface DisplayProps {
    textArr?: string[];
    text?: string;
}

export const Display = React.memo(function Display({ text, textArr }: DisplayProps) {
    const parts = textArr || (text as any).split('\n');

    const formattedText = parts.map((part: any, index: number) => {
        const obj = JSONParse(part);
        const { done, response } = obj;

        if (!done && response !== undefined) {
            return response;
        }
    }).join("");


    return (
        <div className="scrollbar overflow-y-auto h-128">
            <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
                {formattedText}
            </div>
        </div >
    )
});