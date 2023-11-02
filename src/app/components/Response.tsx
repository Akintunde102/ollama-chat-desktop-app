import { OLlamaModel, OLlamaModelTitle } from "../store/ollama/models";
import { Display } from "./Display"

interface ResponseDisplayProps {
    response: string;
}

export const ResponseDisplay = ({ response }: ResponseDisplayProps) => {
    if (!response) {
        return <></>
    }

    const responseArr = response.split("\n");

    const { model } = JSON.parse(responseArr[0]);

    return (
        <div className="mt-4">
            <div className="flex justify-between">
                <div className="text-left">
                    <h2 className="text-lg font-bold mb-2">Response:</h2>
                </div>
                <div className="text-right">
                    <span className="text-purple-600 text-sm"> {OLlamaModelTitle[model as OLlamaModel]}</span>
                </div>
            </div>
            <Display textArr={responseArr} />
        </div >)
}