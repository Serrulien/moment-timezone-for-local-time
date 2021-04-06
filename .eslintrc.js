module.exports = {
  "env": {
    "browser": true,
    "node": true
  },
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
    "prettier",
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "project": "tsconfig.eslint.json",
  },
  "plugins": [
    "eslint-plugin-prefer-arrow",
    "eslint-plugin-jsdoc",
    "eslint-plugin-import",
    "@typescript-eslint",
  ],
};
