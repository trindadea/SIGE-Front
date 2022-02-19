module.exports = {

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },

  env: {
    node: true,
    browser: true
  },

  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    // "plugin:vue/vue3-recommended",
    "prettier"
  ],
  plugins: [
    'vue',
    'prettier'
  ],

  globals: {
    'ga': true, // Google Analytics
    'cordova': true,
    '__statics': true,
    'process': true,
    'Capacitor': true,
    'chrome': true
  },

  rules: {
    'generator-star-spacing': 'off',
    'arrow-parens': 'off',
    'one-var': 'off',
    'import/first': 'off',
    'import/named': 'error',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'vue/no-unused-vars': 'error',
    'import/no-extraneous-dependencies': 'off',
    'prefer-promise-reject-errors': 'off',
    "vue/require-default-prop": "off",
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  }
}