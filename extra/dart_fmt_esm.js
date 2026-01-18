/* @ts-self-types="./dart_fmt.d.ts" */
// prettier-ignore
import source wasmModule from "./dart_fmt.wasm";
import { formatWrapper, initSync } from "./dart_fmt.mjs";

const app = initSync(wasmModule);

export function format(source, filename, options) {
	return formatWrapper(app, source, filename, options);
}
