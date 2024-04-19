import React, { useState } from "react";
import { app, field, model } from "../../types/builder/field";
import ActionsPanel from "../../components/builder/panels/ActionsPanel";
import ContentPanel from "../../components/builder/panels/ContentPanel";

const Builder = () => {
  const [appList, setAppList] = useState<app[]>([]);
  const [selectedApp, setSelectedApp] = useState<app>({} as app);
  const [selectedModel, setSelectedModel] = useState<model>({} as model);

  const createNewModel = () => {
    const newModel:model = {modelName:"New Model","label":"New Model",fields:[]}
    selectedApp.models.push(newModel)
  };

  const createNewApp = () => {
    const newApp: app = { appName: "New App", models: [] };
    setAppList([...appList, newApp]);
  };

  const selectApp = (item: app) => {
    setSelectedApp(item);
  };

  const selectModel = (item: model) => {
    setSelectedModel(item);
  };

  return (
    <div className="flex w-full h-screen">
      <div className="bg-gray-900 w-1/6 text-white border-r-gray-700 border-r-2 p-2">
        <button onClick={createNewApp} className="bg-gray-700 text-white p-2">
          Add App
        </button>
        <br />
        <br />
        <hr />
        <ul>
          {appList?.map((item) => (
            <li
              onClick={() => {
                selectApp(item);
              }}
              className="border-b-2 border-b-gray-700 p-2 hover:bg-gray-600 hover:cursor-pointer"
            >
              {item.appName}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-300 w-4/6 text-white flex flex-col h-screen">
        <div className="h-5/6 p-2">
          <div className="flex space-x-2 flex-wrap">
            <ContentPanel selectedApp={selectedApp}/>
          </div>
        </div>
        <div className="bg-gray-900 text-white h-1/6 p-2">
          <ActionsPanel selectedApp={selectedApp} />
        </div>
      </div>
      <div className="bg-gray-900 w-1/6 text-white border-l-2 border-l-gray-700 p-2">
        This is the attributes side
      </div>
    </div>
  );
};

export default Builder;
