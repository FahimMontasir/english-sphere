/** @type {import('@babel/core').TransformOptions} */
module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  env: {
    production: {},
  },
  plugins: [
    [
      /** Enables baseUrl: "./" option in tsconfig.json to work @see https://github.com/entwicklerstube/babel-plugin-root-import */
      "babel-plugin-root-import",
      {
        paths: [
          {
            rootPathPrefix: "src/",
            rootPathSuffix: "src",
          },
          {
            rootPathPrefix: "assets/",
            rootPathSuffix: "assets",
          },
        ],
      },
    ],
    "react-native-reanimated/plugin",
  ],
}
