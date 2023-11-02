"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';
import { Pills, ResponseDisplay, TopPanelInfo } from './components';
import { OllamaModelItems } from './component-utils';
import { useEnterKeyListener } from './hooks/useEnterKeyListener';
import { Loader } from './components/Loader';
import { callOllama } from './store/ollama/api';
import { OLlamaModel } from './store/ollama/models';
import { AxiosError } from 'axios';
import { useInterval } from 'usehooks-ts';

const MyForm: React.FC = () => {
  const [model, setModel] = useState<OLlamaModel>(OLlamaModel.Llama2);
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<any | null>(null);
  const [ollamaServerState, setOllamaServerState] = useState<"on" | "off" | "unclear">("on");
  const [loading, setLoading] = useState(false);
  const [modelItems, setModelItems] = useState<Array<any>>([]);
  const [intervalItemCall, setIntervalItemCall] = useState(true);

  const processOllamaCallError = (error: AxiosError) => {
    setIntervalItemCall(true);
    if (error.code === "ERR_NETWORK") {
      setOllamaServerState("off");
      return;
    }
    setOllamaServerState("unclear")
  };

  useInterval(
    () => {
      OllamaModelItems().then((retrievedModelItems) => {
        setIntervalItemCall(false);
        setOllamaServerState("on");
        setModelItems(retrievedModelItems);
      }).catch(error => {
        processOllamaCallError(error)
        setIntervalItemCall(true);
      })
    },
    intervalItemCall ? 1000 : null,
  )



  const handleSubmit = async () => {
    setLoading(true);
    try {
      const message = await callOllama({
        data: {
          model: model,
          prompt: prompt,
        },
        endPoint: "postPrompt",
      });
      setResponse(message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      processOllamaCallError(error as any)
    }
  };

  const { pressTime, pressed } = useEnterKeyListener({
    ignoreHandlerWhenShiftKeyIsPressed: true
  });

  useEffect(() => {
    if (pressed) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressTime])

  const handleModelChange = (model: OLlamaModel) => {
    setModel(model);
  };

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!pressed) {
      setPrompt(e.target.value);
    }
  };

  return (
    <main className="bg-white">
      <TopPanelInfo text="Your Ollama App Seems broken, Please Restart" displayCondition={ollamaServerState === "unclear"} />
      <TopPanelInfo text="Please Turn on Your Ollama App, then Restart the app" displayCondition={ollamaServerState === "off"} />
      {
        ollamaServerState === "on" && (
          <div className="flex flex-col">
            <div className="z-30 w-full items-center font-mono text-sm">
              <Pills activeValue={model} onClickHandler={handleModelChange} items={modelItems} />
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }} className="mx-auto bg-white p-6 shadow-md w-full">
                <div className="mb-4">
                  <label htmlFor="prompt" className="block text-gray-700 font-bold mb-2">
                    Prompt:
                  </label>
                  <textarea
                    id="prompt"
                    style={{ height: 200 }}
                    value={prompt}
                    onChange={(e: any) => handlePromptChange(e)}
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {prompt}
                  </textarea>
                </div>

                <div className="flex justify-between">
                  <div className="text-left">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                      Submit
                    </button>
                  </div>
                  <div className="text-right">
                    <Loader loading={loading} />
                  </div>
                </div>
                <ResponseDisplay response={response} />
              </form>
            </div>
          </div>
        )
      }
    </main>

  );
};

export default MyForm;