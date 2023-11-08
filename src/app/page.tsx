"use client"
import React, { useState, ChangeEvent, useEffect } from 'react';
import { ResponseDisplay, TopPanelInfo } from './components';
import { OllamaModelItems } from './component-utils';
import { useEnterKeyListener } from './hooks/useEnterKeyListener';
import { Loader } from './components/Loader';
import { callOllama } from './store/ollama/api';
import { OLlamaModel } from './store/ollama/models';
import { AxiosError } from 'axios';
import { useInterval } from 'usehooks-ts';
import { LightPills } from './components/LightPills';
import createUIIndication from './utils/createUIIndication';
import SimpleError from './components/SimpleError';
import { ollamaServer } from './utils/tauriCommand';
import FullPageLoader from './components/FullPageLoader';
import { formatResponse } from './store/ollama/format-response';

const MyForm: React.FC = () => {
  const [model, setModel] = useState<OLlamaModel>(OLlamaModel.Llama2);
  const [context, setContext] = useState<any[]>([]);
  const [submissionStamp, setSubmissionStamp] = useState<Date | undefined>(undefined);
  const [prompt, setPrompt] = useState<string>('');
  const [responseDetails, setResponseDetails] = useState<any | null>(null);
  const [ollamaServerState, setOllamaServerState] = useState<"on" | "off" | "unstable" | "unknown">("unknown");
  const [loading, setLoading] = useState(false);
  const [modelItems, setModelItems] = useState<Array<any>>([]);
  const [intervalItemCall, setIntervalItemCall] = useState(true);
  const [error, setError] = useState<string>("");

  const { pressTime, pressed } = useEnterKeyListener({
    ignoreHandlerWhenShiftKeyIsPressed: true
  });

  useEffect(() => {
    if (ollamaServerState !== "on") {
      ollamaServer().start().then((res) => {
        if (res.code === 0) {
          setOllamaServerState("on");
          return;
        }
      });
    }
  }, [ollamaServerState]);

  useInterval(
    () => {

      if (modelItems.length) {
        setIntervalItemCall(false);
        return;
      }

      OllamaModelItems().then((retrievedModelItems) => {
        setIntervalItemCall(false);
        setOllamaServerState("on");
        setModelItems(retrievedModelItems);
      }).catch(error => {
        processOllamaCallError(error)
        setIntervalItemCall(true);
      });

    },
    intervalItemCall ? 1000 : null,
  );

  useEffect(() => {
    if (submissionStamp || pressed) {
      handleSubmit();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionStamp, pressTime])


  const errorIndicator = createUIIndication(setError);
  const loadingIndicator = createUIIndication(setLoading);

  const processOllamaCallError = (error: AxiosError) => {
    setIntervalItemCall(true);
    if (error.code === "ERR_NETWORK") {
      setOllamaServerState("off");
      return;
    }

    setOllamaServerState("unstable")
  };


  const handleSubmit = async () => {
    try {

      if (!prompt) {
        errorIndicator.endSoon({ startMessage: "Please Fill In Box With A Message", endMessage: "" })
        return;
      }

      loadingIndicator.start();

      const response = await callOllama({
        data: {
          model: model,
          prompt: prompt,
          context
        },
        endPoint: "postPrompt",
      });

      const formattedResponse = formatResponse(response);

      setContext(formattedResponse.context)

      setResponseDetails(formattedResponse);

      loadingIndicator.end();

    } catch (error) {
      loadingIndicator.end();
      processOllamaCallError(error as any);
    }
  };


  const handleModelChange = (model: OLlamaModel) => {
    setModel(model);
    setSubmissionStamp(new Date());
  };

  const handlePromptChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!pressed) {
      setPrompt(e.target.value);
    }
  };


  if (ollamaServerState !== "on") {
    return (
      <main className="bg-white">
        <FullPageLoader loading={ollamaServerState === "unknown"} loadingText="Loading Ollama Server" />
        <TopPanelInfo text="Your Ollama App Seems broken, Please Restart" displayCondition={ollamaServerState === "unstable"} />
        <TopPanelInfo text="Please Turn on Your Ollama App, then Restart the app" displayCondition={ollamaServerState === "off"} />
      </main>
    )
  }

  return (
    <main className="bg-white">
      <div className="flex flex-col">
        <div className="z-30 w-full items-center font-mono text-sm mx-auto bg-white p-6 shadow-md">
          <form onSubmit={(e) => { e.preventDefault(); setSubmissionStamp(new Date); }}>
            <div className="mb-4">
              <div className="flex justify-between">
                <div className="text-left">
                  <label htmlFor="prompt" className="block text-gray-700 font-bold mb-2">
                    Prompt:
                  </label>
                </div>
                <div className="text-right">
                  {
                    modelItems.length === 0
                      ? (<Loader loading={true} />)
                      : (
                        <LightPills activeValue={model} onClickHandler={handleModelChange} items={modelItems} />
                      )
                  }
                </div>
              </div>
              <textarea
                id="prompt"
                placeholder='How to prepare pizza'
                style={{ height: 200 }}
                value={prompt}
                onChange={(e: any) => handlePromptChange(e)}
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
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
                <SimpleError error={error} />
              </div>
              <div className="text-right">
                <Loader loading={loading} />
              </div>
            </div>
          </form>
          <ResponseDisplay text={responseDetails?.text} model={responseDetails?.model} />
        </div>
      </div>
    </main>
  );
};

export default MyForm;