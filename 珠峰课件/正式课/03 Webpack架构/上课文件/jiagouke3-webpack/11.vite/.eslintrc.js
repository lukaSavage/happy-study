module.exports = {
  root: true, //eslint配置文件是可以继承的，父子关系 继承关系的
  env: {
    browser: true, //浏览器
    es2021: true,
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended", //vue3的推荐配置
    "eslint:recommended", //eslint的推荐配置
    "@vue/typescript/recommended", //typescript的推荐配置
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2021,
  },
  rules: {
    "no-undef": "off",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
  },
};
