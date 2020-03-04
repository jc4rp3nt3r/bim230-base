const path = require('path');
const bs = require('browser-sync');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

const vscode = require('./.vscode/iisexpress.json')


module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: "./src/js/main.js",    // ---------------- ToDo: Start Here... not working... just want simple HTML
  watch: true,
  stats: "none",
  output: {
    filename: "[name].js",
    path: __dirname + "/dist"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 3001
  },
  module: {
    rules: [
      {
        // JavaScript
        test: /\.(js)$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/env", { useBuiltIns: "usage" }]],
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        }
      },
      {
        // SCSS
        test: /\.scss$/,
        include: [path.resolve(__dirname, "src")],
        sideEffects: true,
        use: [
          { loader: "css-loader" },
          { loader: "postcss-loader" },
          {
            loader: "sass-loader",
            options: { includePaths: [path.resolve(__dirname, "node_modules")] }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: { "~": path.resolve(__dirname) },
    extensions: [".js", ".json", ".html", ".htm", ".md"]
  },
  plugins: [
    new BrowserSyncPlugin(
      {
        host: "localhost",
        port: 3000,
        ui: { port: 3002 },
        proxy: `http://localhost:3001`,
        open: true,
        watch: true,
        files: ["templates/**/*.htm", "data/uploads/media/**/*", "images/**/*"]
      },
      { reload: false }
    ),
    // new HandlebarsPlugin({
    //   entry: path.join(process.cwd(), "src", "views", "*.htm"),
    //   output: path.join(process.cwd(), "dist", "[name].htm"),
    //   partials: [path.join(process.cwd(), "src", "views", "includes", "*.htm")]
    // }),
    new FriendlyErrorsWebpackPlugin()
  ]
};
