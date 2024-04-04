const path = require("path");
const HWP = require("html-webpack-plugin");
module.exports = {
  entry: path.resolve(__dirname, "../src/frontend/index.jsx"),
  output: { 
    path: path.resolve(__dirname, "../src/static/frontend_dev/js/"),
    filename:'frontend-dev.js'
  },
  plugins: [
    new HWP({ 
      template: path.join(__dirname, "../src/frontend/index.html"),
      filename: path.join(__dirname, "../src/templates/frontend_dev/index.html")
    }),
  ],
  optimization: { innerGraph: false },
  module: {
    rules: [
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, '../src/frontend'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
