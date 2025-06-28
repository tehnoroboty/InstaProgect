module.exports = {
  "*.{js,jsx,ts,tsx}": [
    "eslint --fix",      // Использует .eslintrc.cjs
    "prettier --write",   // Использует .prettierrc.cjs
  ],
  "*.{css,scss}": [
    "stylelint --fix",   // Использует .stylelintrc.cjs
    "prettier --write",
  ],
  "*.{json,md}": [
    "prettier --write",
  ]
}