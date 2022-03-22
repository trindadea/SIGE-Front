const esModules = ['quasar/lang', 'lodash-es'].join('|');

module.exports = {
  globals: {
    __DEV__: true,
    'vue-jest': {
      pug: { doctype: 'html' },
    },
  },
  collectCoverage: false,
  coverageDirectory: '<rootDir>/test/coverage',
  collectCoverageFrom: [
    '<rootDir>/src/**/*.vue',
    '<rootDir>/src/**/*.js',
    '<rootDir>/src/**/*.jsx',
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '.d.ts$'],
  testMatch: [
    '<rootDir>/test/jest/__tests__/**/*.(spec|test).js',
    '<rootDir>/test/jest/components/**/*.(spec|test).js',
    '<rootDir>/src/**/*.(spec|test).js',
  ],
  moduleFileExtensions: ['vue', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^vue$': 'vue/dist/vue.common.js',
    '^test-utils$': '@vue/test-utils/dist/vue-test-utils.js',
    '^quasar$': 'quasar/dist/quasar.common.js',
    '^~/(.*)$': '<rootDir>/$1',
    '^src/(.*)$': '<rootDir>/src/$1',
    '.*css$': '@quasar/quasar-app-extension-testing-unit-jest/stub.css',
  },
  transform: {
    '.*\\.vue$': 'vue-jest',
    '.*\\.js$': 'babel-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
    'jest-transform-stub',
  },
  transformIgnorePatterns: [`node_modules/(?!(${esModules}))`],
  snapshotSerializers: ['jest-serializer-vue'],
};
