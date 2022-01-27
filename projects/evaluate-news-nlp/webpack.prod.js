const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxPlugin = require("workbox-webpack-plugin");

module.exports = {
  entry: "./src/client/index.js",
  mode: "production",
  devtool: "source-map",
  output: {
    libraryTarget: "var",
    library: "Client",
  },
  module: {
    rules: [
      {
        test: "/.js$/",
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new WorkboxPlugin.GenerateSW({
        // Do not precache images
        exclude: [/\.(?:png|jpg|jpeg|svg)$/],
  
        // Define runtime caching rules.
        runtimeCaching: [{
          // Match any request that ends with .png, .jpg, .jpeg or .svg.
          urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
  
          // Apply a cache-first strategy.
          handler: 'CacheFirst',
  
          options: {
            // Use a custom cache name.
            cacheName: 'images',
  
            // Only cache 10 images.
            expiration: {
              maxEntries: 10,
            },
          },
        }],
    }),
    new HtmlWebPackPlugin({
      template: "./src/client/views/index.html",
      filename: "./index.html",
    }),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
};