const path = require("path");
const HTMLPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin")

module.exports = {
    entry: {
        index: path.resolve("./src/index.tsx"),
        contentScript: path.resolve("./src/contentScript/contentScript.ts"),
        backgroundScript: path.resolve("./src/backgroundScript/backgroundScript.ts")

    },
    mode: "production",
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
    },
	plugins: [
        new CopyPlugin({
            patterns: [
                { from: "manifest.json", to: "manifest.json" },
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
