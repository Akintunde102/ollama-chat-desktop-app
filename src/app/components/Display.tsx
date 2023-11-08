import React from 'react';

interface DisplayProps {
    text?: string;
}

export const Display = React.memo(function Display({ text }: DisplayProps) {
    return (
        <div className="scrollbar overflow-y-auto h-128">
            <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap">
                {text}
            </div>
        </div >
    )
});