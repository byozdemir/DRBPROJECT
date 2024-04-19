import React, { useState } from "react";
import { app, field, model } from "../../../types/builder/field";

type panelProps = {
  selectedApp: app;
};

const ContentPanel = ({ selectedApp }: panelProps) => {
  const [models, setModels] = useState<model[]>(selectedApp.models || []);
  const addModel = () => {
    console.log(models);
    const newModel: model = {
      modelName: "New Model",
      label: "New Model",
      fields: [],
    };
    setModels([...models, newModel]);
  };
  const addField = (item: model) => {
    const newField: field = {
      fieldName: "New Field",
      label: "New Field",
      type: "CharField",
      showOnTable: false,
      showOnForm: false,
      showOnRestApi: false,
      djangoAttributes: [],
      formAttributes: [],
    };
    item.fields.push(newField);
  };
  return (
    <div>
      <button onClick={addModel} className="bg-gray-500 text-white p-2">
        Add Model
      </button>

      <div className="grid grid-cols-5 mt-2">
        {models.map((item) => (
          <div key={item.modelName} className="m-1 p-1 bg-white">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
              <div className="">
                <div className="flex flex-col space-y-2">
                  <div className="flex flex-col space-y-2">
                    <input
                      type="text"
                      className="border-2 text-black p-1 w-full"
                      placeholder="Model Name"
                    />
                    <input
                      type="text"
                      className="border-2 text-black p-1 w-full"
                      placeholder="Model Label"
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <div className="flex flex-row space-x-2 items-center justify-between">
                      <span className="text-xl text-gray-500">Fields</span>
                      <button
                        onClick={() => {
                          addField(item);
                        }}
                        className="text-green-500 font-extrabold text-xl"
                      >
                        +
                      </button>
                    </div>
                    <ul>
                      {item.fields.map((field) => (
                        <li
                          key={field.fieldName}
                          className="text-gray-500  hover:bg-gray-300 hover:text-black hover:cursor-pointer flex space-x-2 items-center justify-between"
                        >
                          <span>{field.fieldName} </span>
                          <button className="text-red-500 text-xl font-bold p-1">
                            X
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-row space-x-2">
                    <button className="p-1 rounded w-full bg-green-500 shadow-lg text-white">
                      Save Model
                    </button>
                    <button className="p-1 rounded w-full bg-red-500 shadow-lg text-white">
                      Delete Model
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentPanel;
