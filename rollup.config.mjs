import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";

export default {
  input: "src/plugin.ts",
  output: {
    file: "com.kadedworkin.monologue-ptt.sdPlugin/bin/plugin.js",
    format: "es",
    sourcemap: true,
  },
  external: ["child_process", "path", "url", "fs", "os", "crypto", "events", "stream", "util", "assert", "buffer", "net", "http", "https", "tls"],
  plugins: [
    resolve({ preferBuiltins: true }),
    commonjs(),
    typescript({ tsconfig: "./tsconfig.json" }),
  ],
};
