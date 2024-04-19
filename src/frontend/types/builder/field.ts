export type field = {
  fieldName: string;
  label: string;
  type: string;
  showOnTable: boolean;
  showOnForm: boolean;
  showOnRestApi: boolean;
  djangoAttributes: string[];
  formAttributes: string[];
};

export type model = {
  modelName: string;
  label: string;
  fields: field[];
};

export type app = {
  appName: string;
  models: model[];
};

