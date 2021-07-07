// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    "cypress/globals": true,
    es2021: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "react-app", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: ["react", "prettier", "jest", "cypress"],
  rules: {
    indent: [
      "error",
      2,
      { SwitchCase: 1, ignoredNodes: ["ConditionalExpression"] },
    ],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
