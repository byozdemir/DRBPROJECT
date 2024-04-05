const path = require("path");
const HWP = require("html-webpack-plugin");
module.exports = {
  entry: path.resolve(__dirname, "../src/frontend/index.tsx"),
  output: { 
    path: path.resolve(__dirname, "../src/static/frontend_dev/js/"),
    filename:'frontend-dev.js'
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js',".jsx"]
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
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react","@babel/preset-typescript"],
          },
        },
      },
    ],
  },
};
