module.exports = {
  root: true,
  "extends": "google",
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'

  },
  env: {
    node: true,
    browser: true,
    es6: true
  },
  rules: {
    "space-before-function-paren": ["error", "ignore"],
    "require-jsdoc": "off",
    "max-len": [0, 160],
    "object-curly-spacing": [2, "always"],
    "no-invalid-this": "off",
    "prefer-rest-params": "off",
    "comma-dangle": ["error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "ignore"
    }],
    "semi": ["error", "always", { "omitLastInOneLineBlock": false }]
  }
};
