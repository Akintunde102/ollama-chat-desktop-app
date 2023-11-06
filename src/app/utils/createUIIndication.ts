interface EndSoonArgs {
    delay?: number;
    startMessage?: any;
    endMessage?: any;
}

interface DelayedEndArgs {
    delay?: number;
    endMessage?: any;
}


const createUIIndication = (stateSet: any) => {
    return {
        start: (startMessage: any = true) => stateSet(startMessage),
        end: (endMessage: any = false) => stateSet(endMessage),
        endSoon: (args: EndSoonArgs) => {
            const { delay = 1500, startMessage = true, endMessage = false } = args
            stateSet(startMessage);
            setTimeout(() => {
                stateSet(endMessage);
            }, delay);
        },
        delayedEnd: (args: DelayedEndArgs) => {
            const { delay = 1500, endMessage = false } = args
            setTimeout(() => {
                stateSet(endMessage);
            }, delay);
        }
    };
};

export default createUIIndication;
