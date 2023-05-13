const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")
const webpack = require('webpack')

module.exports = {
    entry: {
        index: path.resolve("./src/index.tsx"),
        contentScript: path.resolve("./src/contentScript/contentScript.ts"),
        backgroundScript: path.resolve("./src/backgroundScript/backgroundScript.ts")

    },
    mode: "production",
    //mode: "development",
    //devtool: "source-map",
    //devtool: 'cheap-module-source-map',
    module: {
        rules: [
            {
              test: /\.tsx?$/,
               use: [
                 {
                  loader: "ts-loader",
                   options: {
                     compilerOptions: { noEmit: false },
                    }
                  }],
               exclude: /node_modules/,
            },
            {
              exclude: /node_modules/,
              test: /\.css$/i,
               use: [
                  "style-loader",
                  "css-loader"
               ]
            },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 8192
                    }
                  }
                ]
            }
        ],
    },
    output: {
		filename: "[name].js", // the file name would be my entry"s name with a ".bundle.js" suffix
		path: path.resolve(__dirname, "dist") // put all of the build in a dist folder
	},
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        fallback: { 
          "os": false,
          "fs": false,
          "tls": false,
          "net": false,
          "path": false,
          "zlib": false,
          "http": false,
          "https": false,
          "crypto": false,
          "crypto-browserify": require.resolve("crypto-browserify"), 
          "stream": require.resolve("stream-browserify"),
          "process/browser": require.resolve("process/browser")
        },
        alias: {
          process: "process/browser"
        }
    },
	plugins: [
        // fix "process is not defined" error:
        new webpack.ProvidePlugin({
          process: 'process/browser',
        }),
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(process.env)
        }),
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "manifest.json" },
                { from: path.resolve(__dirname, "./src/zkFiles"), to: path.resolve(__dirname, "./dist/zkFiles") },

            ],
        }),
        ...getHtmlPlugins(["index"]),
	]
}
function getHtmlPlugins(chunks) {
    return chunks.map(
        (chunk) =>
            new HTMLPlugin({
                inject: true,
                title: "Plurality",
                filename: `${chunk}.html`,
                chunks: [chunk],
            })
    );
}
