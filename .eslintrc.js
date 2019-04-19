module.exports = {
  plugins: [
    "@typescript-eslint",
    "prettier"
  ],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
    "prettier",
    "prettier/react",
    "prettier/@typescript-eslint",
  ],
  env: {
    node: true,
    browser: true,
  },
  rules: {
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 80
      }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      "error",
      { allowExpressions: true, allowTypedFunctionExpressions: true },
    ],
    // Redundant with TS
    "react/prop-types": false,
    // A11y
    "jsx-a11y/label-has-for": false,
    "jsx-a11y/label-has-associated-control": 2
  },
}
