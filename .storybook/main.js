const webpackFinal = require('../webpack-config.js');

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)",
    "../src/**/**/**/*.stories.mdx",
    "../src/**/**/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  "staticDirs": [{from: '../src/statics', to:'/statics'}],
  "framework": "@storybook/vue",
  webpackFinal: async (config) => {

    // add SCSS support for CSS Modules
    config.module.rules.push({
        test: /\.scss$/,
        use: [
            require.resolve("vue-style-loader"),
            require.resolve("css-loader"),
            require.resolve("sass-loader"),
        ],
    });

    return config;
  }
}