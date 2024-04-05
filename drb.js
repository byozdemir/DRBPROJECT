const path = require("path");
const fs = require("fs");

const generateModel = (model) => {
  var gerenatedCode = `class ${model.modelName}(models.Model):\n`;
  model.fields.forEach((field) => {
    if(field.modelItem==false){
        return;
    }
    gerenatedCode += `\t${field.fieldName} = models.${field.type}(verbose_name='${field.label}'`;
    if (field.attrs) {
      gerenatedCode += ",";
      field.attrs.forEach((attr, index) => {
        const parsed = attr.split("::");
        gerenatedCode += `${
          parsed.length > 1 ? parsed[0] + "(" + parsed[1] + ")" : parsed[0]
        }${index !== field.attrs.length - 1 ? "," : ""}`;
      });
    }
    gerenatedCode += ")\n";
  });
  gerenatedCode += `\tclass Meta:\n\t\tverbose_name = '${model.label}'\n\t\tverbose_name_plural = '${model.label}'`;
  console.log(gerenatedCode);
};

const getAllDrbSchema = (target) => {
  const files = fs
    .readdirSync(target, { withFileTypes: true })
    .filter(
      (item) =>
        !item.isDirectory() &
        !item.name.includes("-sample") &
        item.name.includes("_object")
    )
    .map((item) => item.name);
  return files;
};

DRBSCHEMA_PATH = path.resolve(__dirname, "drbschema");
DRBDJANGO_PATH = path.resolve(__dirname, "src");
DRBFRONTEND_PATH = path.resolve(DRBDJANGO_PATH, "frontend");
const files = getAllDrbSchema(DRBSCHEMA_PATH);
files.forEach((item) => {
  var modelCode = "";
  const importedObject = require(path.resolve(DRBSCHEMA_PATH, item));
  importedObject.DRBObject.django.models.forEach((model) => {
    const code = generateModel(model);
  });
});
