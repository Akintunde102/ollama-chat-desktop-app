function JSONParse(jsonString: string) {
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        return {};
    }
};

export const formatResponse = (response: string) => {
    const arr = response.split("\n");

    const res = {
        context: [],
        model: "",
        text: "",
    }

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];

        const obj = JSONParse(element);

        const { done, response, context, model } = obj;

        if (response !== undefined) {
            if (done) {
                res.context = context;
                res.model = model;
                continue;
            };

            res.text += response;


        }
    }

    console.log({ res })
    return res;
} 