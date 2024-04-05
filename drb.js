const path = require("path");
const fs = require("fs");

const generateModel = (model) => {
  var generatedCode = `\nclass ${model.modelName}(models.Model):\n`;
  model.fields.forEach((field) => {
    if (field.modelItem == false) {
      return;
    }
    generatedCode += `\t${field.fieldName} = models.${field.type}(verbose_name='${field.label}'`;
    if (field.djangoAttrs) {
      generatedCode += ",";
      field.djangoAttrs.forEach((attr, index) => {
        const parsed = attr.split("::");
        generatedCode += `${
          parsed.length > 1 ? parsed[0] + "(" + parsed[1] + ")" : parsed[0]
        }${index !== field.djangoAttrs.length - 1 ? "," : ""}`;
      });
    }
    generatedCode += ")\n";
  });
  generatedCode += `\n\tdef __str__(self):\n\t\treturn '${model.label}'\n`;
  generatedCode += `\n\tclass Meta:\n\t\tverbose_name = '${model.label}'\n\t\tverbose_name_plural = '${model.label}'\n\n`;
  return generatedCode;
};

const generateSchema = (model) => {
  var generatedCode = `\nconst ${model.modelName}Schema = yup.object().shape({\n`;
  model.fields.forEach((field) => {
    if (field.formItem == false) {
      return;
    }
    generatedCode += `\t${field.fieldName}: yup.${field.frontendType}()\n`;
    if (field.reactAttrs) {
      field.reactAttrs.forEach((attr, index) => {
        const parsed = attr.split("::");
        generatedCode += `\t.${
          parsed.length > 1 ? parsed[0] + "(" + parsed[1] + ")" : parsed[0]
        }${index == field.reactAttrs.length - 1 ? ",\n" : "\n"}`;
      });
    }
    generatedCode += "\n";
  });
  generatedCode += "});\n";
  return generatedCode;
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

const DRBSCHEMA_PATH = path.resolve(__dirname, "drbschema");
const DRBDJANGO_PATH = path.resolve(__dirname, "src");
const DRBFRONTEND_PATH = path.resolve(DRBDJANGO_PATH, "frontend");
const SCHEMA_PATH = path.resolve(DRBFRONTEND_PATH, "lib/schemas")
const files = getAllDrbSchema(DRBSCHEMA_PATH);
files.forEach((item) => {
  var modelCode = "from django.db import models\n\n";
  var schemaCode = "import * as yup from 'yup';\n";
  const importedObject = require(path.resolve(DRBSCHEMA_PATH, item));
  const appPath = path.resolve(
    DRBDJANGO_PATH,
    importedObject.DRBObject.django.app
  );
  importedObject.DRBObject.django.models.forEach((model) => {
    const code = generateModel(model);
    modelCode += code;
    schemaCode += generateSchema(model);
  });
  fs.writeFile(path.resolve(appPath, "models.py"), modelCode, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(
        `${
          importedObject.DRBObject.django.app
        } Model file successfully created to path:${path.resolve(
          appPath,
          "models.py"
        )}`
      );
    }
  });
  fs.writeFile(path.resolve(SCHEMA_PATH, importedObject.DRBObject.django.app+'Schema.js'), schemaCode, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(
        `${
          importedObject.DRBObject.django.app
        } Schema file successfully created to path:${path.resolve(
          SCHEMA_PATH,
          importedObject.DRBObject.django.app+'Schema.js'
        )}`
      );
    }
  });
});
