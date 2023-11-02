export enum OLlamaModel {
    CodeLlama = "codellama:latest",
    Llama2Uncensored = "llama2-uncensored:latest",
    Llama270b = "llama2:70b",
    Llama13b = "llama2:13b",
    Llama2 = "llama2:latest",
    Mistral = "mistral:latest",
    Vicuna = "vicuna:latest",
    OrcaMini = "orca-mini:latest"
};

export type LikeOllamaModel = `${OLlamaModel}`;

export const OLlamaModelTitle: Record<LikeOllamaModel, string> = {
    "codellama:latest": "Code llama",
    "llama2-uncensored:latest": "llama2 Uncensored",
    "llama2:latest": "llama2",
    "mistral:latest": "mistral",
    "llama2:70b": "llama2 70b",
    "llama2:13b": "llama2 13b",
    "vicuna:latest": "vicuna",
    "orca-mini:latest": "Orca"
};
