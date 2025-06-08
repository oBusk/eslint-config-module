import { FlatCompat } from "@eslint/eslintrc";
import jest from "eslint-plugin-jest";
import jsdoc from "eslint-plugin-jsdoc";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

const compat = new FlatCompat({ baseDirectory: import.meta.dirname });

const eslintConfig = defineConfig(
  ...compat.config({
    root: true,
    extends: ["plugin:import/recommended", "plugin:import/typescript"],
    plugins: ["@typescript-eslint/eslint-plugin"],
    rules: {
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          disallowTypeAnnotations: true,
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-empty-object-type": 0,
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
      "import/order": [
        "error",
        {
          groups: [
            ["builtin", "external"],
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [{ pattern: "^/**", group: "internal" }],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "never",
          warnOnUnassignedImports: true,
        },
      ],
      // Sort imports to sort import members
      "sort-imports": [
        "error",
        { ignoreCase: true, ignoreDeclarationSort: true },
      ],
    },
  }),

  // JSDoc
  jsdoc.configs["flat/recommended-typescript-flavor-error"],
  {
    files: ["**/*.ts?(x)"],
    plugins: {
      jsdoc,
    },
    rules: {
      "jsdoc/require-jsdoc": 0,
      "jsdoc/require-param": 0,
      "jsdoc/require-returns": 0,
      "jsdoc/require-yields": 0,
      "jsdoc/tag-lines": ["error", "any", { startLines: 1, endLines: 0 }],
    },
  },

  // Jest
  jest.configs["flat/recommended"],
  jest.configs["flat/style"],

  // Prettier
  eslintPluginPrettierRecommended,
);

export default eslintConfig;
