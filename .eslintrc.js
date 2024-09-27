// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  globals: {
    process: "readonly",
    require: "readonly",
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "no-unused-vars": "off",
    "react/prop-types": "off",
    "default-param-last": "off",
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off", // 关闭此规则
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/jsx-props-no-spreading": [
      1,
      {
        custom: "ignore",
      },
    ],
    "react/jsx-curly-spacing": [2, "never"],
  },
};
