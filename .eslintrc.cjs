module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"airbnb/rules/react",
		"prettier",
	],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
		project: "./tsconfig.json",
		tsconfigRootDir: __dirname,
	},
	plugins: ["react-refresh"],
	rules: {
		"no-console": "warn",
		"react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
		"@typescript-eslint/no-non-null-assertion": "off",
		"react/react-in-jsx-scope": "off",
		"react/jsx-indent": ["error", "tab"],
		"react/jsx-indent-props": ["error", "tab"],
		"react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
		"react/jsx-props-no-spreading": "off",
		"react/function-component-definition": [
			"error",
			{
				namedComponents: "arrow-function",
				unnamedComponents: "arrow-function",
			},
		],
		"no-underscore-dangle": "off",
	},
};
