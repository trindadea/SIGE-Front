module.exports = {

  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module' // Allows for the use of imports
  },

  env: {
<<<<<<< HEAD
    node: true,
    browser: true
=======
    browser: true,
    "jest/globals": true
>>>>>>> 89415e0 (Update lint config)
  },

  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    "prettier"
  ],
  plugins: [
    'vue',
<<<<<<< HEAD
<<<<<<< HEAD
    'prettier',
    'import'
=======
    'plugin:jest/recommended',

>>>>>>> 05dacaf (#64-Update tests config)
=======
    'jest'
>>>>>>> 89415e0 (Update lint config)
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
    'import/no-extraneous-dependencies': 'off',
    'prefer-promise-reject-errors': 'off',
    "vue/require-default-prop": "off",
    'vue/multi-word-component-names': 'off',
    'vue/no-unused-vars': 'warn',
    'no-unused-vars': 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  }
}