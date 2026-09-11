const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const ModuleFederationPlugin =
  require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "development",

  entry: "./src/index.jsx",

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx"],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "product",

      filename: "remoteEntry.js",

      exposes: {
        "./ProductsList": "./src/App.jsx",
      },

      shared: {
        react: {
          singleton: true,
        },
        "react-dom": {
          singleton: true,
        },
         "react-router-dom": {
          singleton: true,
        },
      },
    }),

    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],

  devServer: {
    port: 3001,
    open: true,
    headers: {
    "Access-Control-Allow-Origin": "*",
  },
  },
};
