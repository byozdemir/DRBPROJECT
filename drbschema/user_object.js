const DRBObject = {
  django: {
    app: "deneme",
    models: [
      {
        modelName: "Accounts",
        label: "Accounts",
        fields: [
          {
            fieldName: "username",
            label: "User Name",
            type: "CharField",
            djangoAttrs: ["max_length::20", "required"],
            reactAttrs:['min::3','max::10','required']
          },
          {
            fieldName: "password",
            label: "Password",
            type: "CharField",
            djangoAttrs: ["max_length::20"],
            reactAttrs:['min::8','max::32','required']
          },
          {
            fieldName: "private_key",
            label: "private_key",
            type: "CharField",
            formItem:false, // Use this prop if you don`t want to add this field to frontend forms.Default:true
            djangoAttrs: ["max_length::20"],
          },
          {
            fieldName: "repassword",
            label: "Password",
            modelItem: false, //Use this prop if you don`t want to add this field to django model.Default:true
            reactAttrs:['min::8','max::32','required']
          },
        ],
      },
    ],
  },
  react: {
    create: ["form", "schema"],
  },
};
module.exports = {
  DRBObject,
};
