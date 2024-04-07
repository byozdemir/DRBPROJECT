const DRBObject = {
    django: {
      app: "post",
      models: [
        {
          modelName: "Posts",
          label: "Posts",
          auth:["create","edit","delete","list"],
          fields: [
            {
              fieldName: "title",
              label: "Post Title",
              type: "CharField",
              frontendType:'string',
              djangoAttrs: ["max_length=20",],
              reactAttrs:['min::3','max::10',]
            },
            {
              fieldName: "postContent",
              label: "Post Content",
              type: "CharField",
              frontendType:'string',
              djangoAttrs: ["max_length=500"],
              reactAttrs:['min::8','max::500',]
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
  