module.exports = {
  parser: "@babel/eslint-parser",
  parserOptions: {
    requireConfigFile: false, // Add this line to avoid requiring a config file for every module
  },
  extends: [
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  plugins: [
    "import",
  ],
  rules: {
    "import/named": "warn",
    "import/default": "warn",
    "import/namespace": "off",
    "import/export": "warn",
    "import/order": ["warn", {
      "groups": ["builtin", "external", "internal"],
      "pathGroups": [
        {
          "pattern": "react",
          "group": "external",
          "position": "before"
        }
      ],
      "pathGroupsExcludedImportTypes": ["builtin"],
      "newlines-between": "always",
      "alphabetize": {
        "order": "asc",
        "caseInsensitive": true
      }
    }],
    "import/no-unresolved": "warn",
    "import/no-duplicates": "warn",
    "import/no-named-as-default": "warn",
    "import/no-named-as-default-member": "warn",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off"
  },
  settings: {
    react: {
      version: "detect"
    },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".mjs"]
      }
    }
  }
};
