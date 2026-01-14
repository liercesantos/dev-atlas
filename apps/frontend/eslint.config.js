import js from "@eslint/js";
import next from "eslint-config-next";
import tseslint from "typescript-eslint";

const config = [
  {
    ignores: ["coverage/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...next,
];

export default config;
