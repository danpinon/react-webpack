const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
        options: { presets: [
          "@babel/env", 
          [
            "@babel/preset-react",
            {
              runtime: "automatic" // 'classic'
            }
          ]
        ] }
      },
    ]
  },
  resolve: { extensions: ["*", ".js", ".jsx"] },
  output: {
    path: path.resolve(__dirname, "build/"),
    filename: "main.js"
  },
};