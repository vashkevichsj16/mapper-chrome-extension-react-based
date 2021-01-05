const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const baseManifest = require("./public/manifest.json");
const WebpackExtensionManifestPlugin = require("webpack-extension-manifest-plugin");
const {ProvidePlugin} = require("webpack");
const config = {
    mode: "development",
    devtool: "cheap-module-source-map",
    entry: {
        popup: path.join(__dirname, "./src/popup/index.js"),
        map: path.join(__dirname, "./src/map/index.js"),
        background: path.join(__dirname, "./src/js/background.js"),
    },
    output: {
        path: path.resolve(__dirname, "./build"),
        filename: "[name]/index.js"
    },
    resolve: {
        extensions: ["*", ".js"]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "popup", // change this to your app title
            meta: {
                charset: "utf-8",
                viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
                "theme-color": "#000000"
            },
            manifest: "manifest.json",
            filename: "popup/popup.html",
            template: "./src/views/popup.html",
            hash: true,
            chunks: ['popup']
        }),
        new HtmlWebpackPlugin({
            title: "map", // change this to your app title
            meta: {
                charset: "utf-8",
                viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
                "theme-color": "#000000"
            },
            manifest: "manifest.json",
            filename: "map/map.html",
            template: "./src/views/map.html",
            hash: true,
            chunks: ['map']
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "public/images",
                    to: "icons"
                },
                {
                    from: "./src/js/in-content.js",
                    to: "inContent/content.js",
                }
            ],
        }),
        new ProvidePlugin({
            "React": "react",
        }),
        new WebpackExtensionManifestPlugin({
            config: {
                base: baseManifest
            }
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
};
module.exports = config;