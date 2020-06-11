import pkg from "./package.json";

export default {
  input: "src/index.js",
  // external: ["immer", "react-redux"],
  output: [{ file: pkg.main, format: "cjs" }],
};
