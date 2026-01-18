/* @ts-self-types="./dart_fmt_web.d.ts" */

import wasm from "./dart_fmt.wasm?url";
import initAsync from "./dart_fmt_web.js";

export default function (input = wasm) {
	return initAsync(input);
}

export * from "./dart_fmt.js";
