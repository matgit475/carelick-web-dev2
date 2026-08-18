const path = require("path");
const Dotenv = require("dotenv-webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  return {
    entry: "./src/index.jsx",
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(jpg|jpeg|png|gif)$/i,
          type: "asset/resource", // Handles image files
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    plugins: [
      new Dotenv({
        path:
          env.production == "true" ? "./.env.production" : "./.env.development", // Load the correct .env file based on the mode
      }),
      new HtmlWebpackPlugin({
        template: "./public/index.html",
      }),
    ],
    mode: env.production === "true" ? "production" : "development",
    devtool: "source-map", // Best for dev with fast rebuilds
    devServer: {
      static: {
        directory: path.join(__dirname, "dist"),
      },
      compress: true,
      port: 8000,
      historyApiFallback: true,
      hot: true,
    },
    performance: {
      hints: false,
    },
  };
};
