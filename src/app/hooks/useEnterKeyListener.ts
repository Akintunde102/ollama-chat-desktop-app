import { useEffect, useState } from 'react';

interface UseEnterKeyListener {
    ignoreHandlerWhenShiftKeyIsPressed: boolean;
}

export const useEnterKeyListener = ({
    ignoreHandlerWhenShiftKeyIsPressed,
}: UseEnterKeyListener) => {
    const [pressTime, setPressTime] = useState<Date>(new Date());
    const [pressed, setPressed] = useState<boolean>(false);

    const listener = (event: any) => {
        setPressed(false);
        if (event.code === "Enter") {
            const ignoreCurrentKeyPress = ignoreHandlerWhenShiftKeyIsPressed && event.shiftKey;
            if (!ignoreCurrentKeyPress) {
                setPressTime(new Date());
                setPressed(true);
            }
        }
    };


    useEffect(() => {
        document.addEventListener("keydown", listener);
        return () => {
            document.removeEventListener("keydown", listener);
        };
    }, []);


    return { pressTime, pressed }
};