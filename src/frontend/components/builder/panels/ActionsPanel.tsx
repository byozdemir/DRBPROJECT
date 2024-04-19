import React, { useState } from "react";
import { app } from "../../../types/builder/field";

type PanelProps = {
  selectedApp: app;
};

const ActionsPanel = ({ selectedApp }: PanelProps) => {
  const [appNameInput, setAppNameInput] = useState<string>(selectedApp.appName);
  
  const updateAppName = ()=>{
    const updatedApp:app = selectedApp
    updatedApp.appName = appNameInput
  }
  
  return (
    <>
      <div className="flex space-x-2">
        <div className="flex flex-col space-y-2">
          <label htmlFor="" className="">
            App Name {selectedApp.appName}
          </label>
          <input
            type="text"
            placeholder="Model Name"
            className="p-2 text-black"
            value={appNameInput}
            onChange={(e) => {
              setAppNameInput(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex flex-row space-x-2 mt-2">
        <button className="bg-green-500 rounded shadow-lg p-2 text-black" onClick={() => {updateAppName()}}>
          Update App
        </button>
        <button className="bg-red-500 rounded shadow-lg text-white p-2">Delete App</button>
      </div>
    </>
  );
};

export default ActionsPanel;
