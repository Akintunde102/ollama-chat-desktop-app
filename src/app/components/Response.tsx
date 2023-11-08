import { OLlamaModel, OLlamaModelTitle } from "../store/ollama/models";
import { Display } from "./Display"

interface ResponseDisplayProps {
    text: string;
    model: string;
}

export const ResponseDisplay = ({ text, model }: ResponseDisplayProps) => {
    if (!text) {
        return <></>
    }

    return (
        <div className="mt-10">
            <div className="flex justify-between">
                <div className="text-left">
                    <h2 className="block text-gray-700 font-bold mb-2">Response:</h2>
                </div>
                <div className="text-right">
                    <span className="text-purple-600 text-sm"> {OLlamaModelTitle[model as OLlamaModel]}</span>
                </div>
            </div>
            <Display text={text.trim()} />
        </div >)
}