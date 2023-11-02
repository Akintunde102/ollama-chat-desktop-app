import axios from "axios";

export const ollamaRequestCancellationSource = axios.CancelToken.source();

export type OllamaEndpoints = "postPrompt" | "getTags";

export const OLLAMA_ROOT_ENDPOINT = "http://localhost:11434/api";

export const OLLAMA_ENDPOINTS: Record<OllamaEndpoints, {
    verb: "post" | "get",
    url: string
}> = {
    postPrompt: {
        verb: "post",
        url: `${OLLAMA_ROOT_ENDPOINT}/generate`
    },
    getTags: {
        verb: "get",
        url: `${OLLAMA_ROOT_ENDPOINT}/tags`
    }
}

export const callOllama = async ({
    data,
    endPoint,
    getFullResponseObj,
}: {
    data?: Record<any, any>;
    endPoint: OllamaEndpoints;
    getFullResponseObj?: boolean;
}) => {
    const { verb, url } = OLLAMA_ENDPOINTS[endPoint];

    let response;

    if (verb === "get") {
        response = await axios.get(url, {
            cancelToken: ollamaRequestCancellationSource.token
        });
    };

    if (verb === "post") {
        response = await axios.post(url, data, {
            cancelToken: ollamaRequestCancellationSource.token
        });
    }

    return getFullResponseObj ? response : response?.data;
}
