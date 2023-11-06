import { callOllama } from "./store/ollama/api";
import { OLlamaModel, OLlamaModelTitle } from "./store/ollama/models";

export const OllamaModelItems = async () => {
    const availableModels = await callOllama({ endPoint: "getTags" });
    const availableModelNames = availableModels.models.map(({ name }: any) => name);


    const ollamaModels = Object.values(OLlamaModel);

    const items = [];

    for (let i = 0; i < ollamaModels.length; i++) {
        const ollamaModel = ollamaModels[i];
        if (availableModelNames.includes(ollamaModel))
            items.push({
                value: ollamaModel,
                title: OLlamaModelTitle[ollamaModel]
            })
    }
    return items;
};