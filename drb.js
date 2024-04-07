const path = require("path");
const fs = require("fs");

const DRBSCHEMA_PATH = path.resolve(__dirname, "drbschema");
const DRBDJANGO_PATH = path.resolve(__dirname, "src");
const DRBFRONTEND_PATH = path.resolve(DRBDJANGO_PATH, "frontend");
const SCHEMA_PATH = path.resolve(DRBFRONTEND_PATH, "lib/schemas");
const FORM_PATH = path.resolve(DRBFRONTEND_PATH, "components/forms");
const TABLE_PATH = path.resolve(DRBFRONTEND_PATH, "components/tables");

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

const generateForm = (model) => {
  const serializedFields = model.fields.filter(
    (field) => field.serialize === undefined
  );
  var generatedCode = `
  import React,{useEffect} from 'react';
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";
  import { toast } from "react-toastify";
  import {${model.modelName}Schema} from '../../lib/${
    model.modelName
  }Schema.js';
  import api from "../../stores/api.js";
  const ${model.modelName}Form = ()=>{
    const [submitting, setSubmitting] = useState(false);
    const [entryID,setEntryID] = useState(0);
    const { register,setValue, handleSubmit,formState: { errors }, reset } = useForm({resolver:yupResolver(${
      model.modelName
    }Schema)});

    useEffect(()=>{
      if(entryID>0){
        api.get('${model.modelName}/${model.modelName}Edit/'+entryID)
        .then((response)=>{
            const {${serializedFields.map(
              (field) => "get_" + field.fieldName
            )}} = response.data
            ${serializedFields
              .map((field) => {
                return `setValue(${field.fieldName},get_${field.fieldName})\n`;
              })
              .join("\t\t")}
        })
        .catch((err)=>{
          toast.error('Error!. Please check the developer console.')
          console.log(err)
        })
      }
    },[])

    const formHandler = async (data) => {
      setSubmitting(true);
      const url = entryID > 0 ? "${model.modelName}/${
    model.modelName
  }Edit/"+entryID : "${model.modelName}/${model.modelName}Create/";
      api
        .post(url, data)
        .then((response) => {
          toast.success("Action successfully completed")
        })
        .catch((err) => {
          toast.error("Error!.Please check the developer console.")
        })
        .finally(() => {
          setSubmitting(false);
        });
    };
    return (
      <>
        <form onSubmit={handleSubmit(formHandler)}>
          ${model.fields
            .map((field) => {
              if (field.serialize != false) {
                return `
              <div className="flex flex-col">
                <input type='text' className='w-full' {...register('${field.fieldName}')} placeholder='${field.label}'/>
                <p className="text-red-500">{errors.${field.fieldName}?.message}</p>
              </div>
              `;
              }
            })
            .join("\t")}
          <button type="submit" className="py-4 rounded-lg font-semibold mt-5 flex items-center justify-center" disabled={submitting}></button>
        </form>
      </>
    )
  }
  export default ${model.modelName}Form;
  `;
  fs.writeFile(
    path.resolve(FORM_PATH, `${model.modelName}Form.jsx`),
    generatedCode,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${model.modelName}Form.jsx successfully created.`);
      }
    }
  );
};

const generateSerializer = (model) => {
  generatedCode = `class ${model.modelName}Serializer(serializers.ModelSerializer):\n`;
  generatedCode += "\tclass Meta(object):\n";
  generatedCode += `\t\tmodel = ${model.modelName}\n`;
  generatedCode += `\t\tfields = [${model.fields.map((item) => {
    return '"' + item.fieldName + '"';
  })}]`;

  generatedCode += "\n\n";
  return generatedCode;
};

const generateApiUrls = (model) => {
  var generatedCode = `
    path('${model.modelName}GetItems/',views.${model.modelName}GetItems),
    path('${model.modelName}Create/',views.${model.modelName}Create),
    path('${model.modelName}Edit/<int:pk>',views.${model.modelName}Edit),
    path('${model.modelName}Delete/<int:pk>',views.${model.modelName}Delete),
    `;
  return generatedCode;
};

const generateTable = (model) => {
  const serializedFields = model.fields.filter(
    (field) => field.serialize === undefined
  );
  var generatedCode = `
  import React,{useState,useEffect} from "react";
  import api from "../../stores/api.js";
  import { toast } from "react-toastify";
  import {
    MaterialReactTable,
    createMRTColumnHelper,
    useMaterialReactTable,
  } from 'material-react-table';
  import { Box, Button } from '@mui/material';
  import FileDownloadIcon from '@mui/icons-material/FileDownload';
  import { mkConfig, generateCsv, download } from 'export-to-csv';
  const columnHelper = createMRTColumnHelper();
  
  const columns = [
    ${serializedFields
      .map((field) => {
        return `
        columnHelper.accessor('${field.fieldName}', {
          header: '${field.label}',
          size: 100,
        })
        `;
      })
      .join(",\n")}
  ]
  const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
  });

  export default function ${model.modelName}Table() {
    const [data,setData] = useState([])
    const [isLoading,setIsLoading] = useState(false)
    useEffect(()=>{
        setIsLoading(true);
        api.get("${model.modelName}/${model.modelName}/GetItems")
        .then((response)=>{
            setData(response.data.items)
        })
        .catch((err)=>{
          toast.error('Error while fetching data! Please check the developer console');
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });

    },[])
    const handleExportRows = (rows) => {
      const rowData = rows.map((row) => row.original);
      const csv = generateCsv(csvConfig)(rowData);
      download(csvConfig)(csv);
    };
  
    const handleExportData = () => {
      const csv = generateCsv(csvConfig)(data);
      download(csvConfig)(csv);
    };
  
    const editRow = (row)=>{
      window.location = "${model.modelName}/${model.modelName}/Edit"+row.original.id
    }
  
    const deleteRow = (row)=>{
      if(window.confim("Are you sure you want to delete this entry?")){
        api.delete("${model.modelName}/${model.modelName}/Delete/"+row.original.id)
        .then((response)=>{
            toast.success('Entry successfully deleted. ')
            // Write code here.
        })
        .cath((err)=>{
          toast.error("Error! Please check the developer console");
          console.log(err)
        })
      }
    }
    const table = useMaterialReactTable({
      columns,
      data,
      enableRowSelection: true,
      enableEditing: true,
      state:{
        isLoading:isLoading
      },
      columnFilterDisplayMode: 'popover',
      paginationDisplayMode: 'pages',
      positionToolbarAlertBanner: 'bottom',
      renderRowActions: ({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip title="Edit">
            <IconButton onClick={()=>{
              editRow(row)
            }}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={()=>{
              deleteRow(row)
            }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      ),
      renderTopToolbarCustomActions: ({ table }) => (
        <Box
          sx={{
            display: 'flex',
            gap: '16px',
            padding: '8px',
            flexWrap: 'wrap',
          }}
        >
          <Button
            //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
            onClick={handleExportData}
            startIcon={<FileDownloadIcon />}
          >
            Export All Data
          </Button>
          <Button
            disabled={table.getPrePaginationRowModel().rows.length === 0}
            //export all rows, including from the next page, (still respects filtering and sorting)
            onClick={() =>
              handleExportRows(table.getPrePaginationRowModel().rows)
            }
            startIcon={<FileDownloadIcon />}
          >
            Export All Rows
          </Button>
          <Button
            disabled={table.getRowModel().rows.length === 0}
            //export all rows as seen on the screen (respects pagination, sorting, filtering, etc.)
            onClick={() => handleExportRows(table.getRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Page Rows
          </Button>
          <Button
            disabled={
              !table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()
            }
            //only export selected rows
            onClick={() => handleExportRows(table.getSelectedRowModel().rows)}
            startIcon={<FileDownloadIcon />}
          >
            Export Selected Rows
          </Button>
        </Box>
      ),
    });

    return(
      <MaterialReactTable table={table}/>
    )

  }



  `;

  fs.writeFile(
    path.resolve(TABLE_PATH, `${model.modelName}Table.jsx`),
    generatedCode,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(`${model.modelName}Table.jsx successfully created.`);
      }
    }
  );
};

const generateRest = (model) => {
  var generatedCode = `
@api_view(['GET'])
${
  model.auth?.includes("list")
    ? `@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])`
    : ""
}
def ${model.modelName}GetItems(request):
  try:
    snippet = ${model.modelName}.objects.all()
    serializer = ${model.modelName}Serializer(snippet,many=True)
    return Response({"items":serializer.data})
  except:
    return Response(status=status.HTTP_404_NOT_FOUND)

${
  model.auth?.includes("create")
    ? `@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])`
    : ""
}
@api_view(['POST'])
def ${model.modelName}Create(request):
  serializer = ${model.modelName}Serializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(status=status.HTTP_200_OK)
  return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

${
  model.auth?.includes("edit")
    ? `@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])`
    : ""
}
@api_view(['GET','PUT'])
def ${model.modelName}Edit(request,pk):
  try:
    snippet = ${model.modelName}.objects.get(pk=pk)
  except ${model.modelName}.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND) 
  
  if request.method == 'GET':
    serializer = ${model.modelName}Serializer(snippet)
    return Response(serializer.data)

  if request.method == 'PUT':
    serializer = ${model.modelName}Serializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
${
  model.auth?.includes("delete")
    ? `@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])`
    : ""
}
@api_view(['DELETE'])
def ${model.modelName}Delete(request,pk):
  try:
    snippet = ${model.modelName}.objects.get(pk=pk)
  except ${model.modelName}.DoesNotExist:
    return Response(status=status.HTTP_404_NOT_FOUND) 
  
  try:
    snippet.delete()
    return Response(status=status.HTTP_200_OK)
  except:
    return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
  `;
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

const files = getAllDrbSchema(DRBSCHEMA_PATH);
files.forEach((item) => {
  var modelCode = "from django.db import models\n\n";
  var schemaCode = "import * as yup from 'yup';\n";
  var restCode = `
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.authtoken.models import Token
from .serializers import *
from .models import *
`;

  const importedObject = require(path.resolve(DRBSCHEMA_PATH, item));
  var urlCode = "from django.urls import path\n\nurlpatterns=[\n";
  var serializerCode = `from rest_framework import serializers\nfrom ${importedObject.DRBObject.django.app}.models import *\n`;
  const appPath = path.resolve(
    DRBDJANGO_PATH,
    importedObject.DRBObject.django.app
  );
  importedObject.DRBObject.django.models.forEach((model) => {
    const code = generateModel(model);
    modelCode += code;
    schemaCode += generateSchema(model);
    serializerCode += generateSerializer(model);
    generateForm(model);
    restCode += generateRest(model);
    urlCode += generateApiUrls(model);
    generateTable(model);
  });

  urlCode += "]";
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
  schemaCode += `module.exports = {
    ${importedObject.DRBObject.django.models.map((item) => {
      return `${item.modelName}Serializers`;
    })}
  }`;
  fs.writeFile(
    path.resolve(
      SCHEMA_PATH,
      importedObject.DRBObject.django.app + "Schema.js"
    ),
    schemaCode,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(
          `${
            importedObject.DRBObject.django.app
          } Schema file successfully created to path:${path.resolve(
            SCHEMA_PATH,
            importedObject.DRBObject.django.app + "Schema.js"
          )}`
        );
      }
    }
  );
  fs.writeFile(
    path.resolve(appPath, "serializers.py"),
    serializerCode,
    (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log(
          `${
            importedObject.DRBObject.django.app
          } Serializer file successfully created to path:${path.resolve(
            appPath,
            "serializers.py"
          )}`
        );
      }
    }
  );
  fs.writeFile(path.resolve(appPath, "views.py"), restCode, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(
        `${
          importedObject.DRBObject.django.app
        } Views file successfully created to path:${path.resolve(
          appPath,
          "views.py"
        )}`
      );
    }
  });
  fs.writeFile(path.resolve(appPath, "urls.py"), urlCode, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(
        `${
          importedObject.DRBObject.django.app
        } Url file successfully created to path:${path.resolve(
          appPath,
          "urls.py"
        )}`
      );
    }
  });
});
