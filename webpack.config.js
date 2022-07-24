const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require("webpack");

module.exports = (env, argv) => {
  const {mode, open = false } = env
  console.log('env:',env)
  console.log('argv:',argv)
  return {
    entry: "./src/index.js",
    mode: mode,
    devtool: "inline-source-map",
    resolve: { extensions: ["*", ".ts", ".tsx", ".js", ".jsx"] },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules|bower_components)/,
          loader: "babel-loader",
          options: { 
            presets: [
              "@babel/env", 
              [
                "@babel/preset-react",
                {
                  runtime: "automatic" // 'classic' this makes possible to not import React from 'react'
                }
              ]
            ] 
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader", 
            "css-loader", 
            {
              loader: "sass-loader",
              options: {
                // Prefer `dart-sass`
                implementation: require.resolve("sass"),
              },
            },
          ]
        }
      ]
    },
    output: {
      path: path.resolve(__dirname, "build/"),
      filename: "main.js"
    },
    plugins: [new HtmlWebpackPlugin({
      template: "./src/template-index.html",
      filename: "index.html",
      chunks: ["template-index", "index_head"],
      minify: false,
    })],
    devServer: { 
      open: open || argv.open, //opens browser
      port: env.port,
      hot: true,
      client: {
        overlay: true, //opens overlay errors
      },
    }
  }
};