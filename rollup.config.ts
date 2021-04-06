import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import camelcase from "lodash.camelcase";
import pkg from "./package.json";

export default {
  external: ["moment-timezone"],
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      format: "umd",
      name: camelcase(pkg.name),
      sourcemap: true,
    },
    { file: pkg.module, format: "es", sourcemap: true },
  ],
  plugins: [
    json(),
    typescript({ tsconfig: "tsconfig.json" }),
    commonjs(),
    resolve(),
  ],
  watch: {
    include: "src/**",
  },
};
