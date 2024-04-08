import { instantiate } from "./dart_fmt.mjs";

let wasm;

function get_imports() {}
function init_memory() {}

// export function initSync(module) {
// 	if (wasm !== undefined) return wasm;

// 	const imports = get_imports();

// 	init_memory(imports);

// 	module = normalize(module);

// 	return (wasm = instantiate(module));
// }

function normalize(module) {
	if (!(module instanceof WebAssembly.Module)) {
		return new WebAssembly.Module(module);
	}
	return module;
}

export default async function (input) {
	if (wasm !== undefined) return wasm;

	if (typeof input === "undefined") {
		input = new URL("dart_fmt.wasm", import.meta.url);
	}
	const imports = get_imports();

	if (
		typeof input === "string" ||
		(typeof Request === "function" && input instanceof Request) ||
		(typeof URL === "function" && input instanceof URL)
	) {
		input = fetch(input);
	}

	init_memory(imports);

	return (wasm = await load(await input)
		.then(normalize)
		.then(instantiate));
}

async function load(module) {
	if (typeof Response === "function" && module instanceof Response) {
		if ("compileStreaming" in WebAssembly) {
			try {
				return await WebAssembly.compileStreaming(module);
			} catch (e) {
				if (module.headers.get("Content-Type") != "application/wasm") {
					console.warn(
						"`WebAssembly.compileStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
						e,
					);
				} else {
					throw e;
				}
			}
		}

		return module.arrayBuffer();
	}

	return module;
}

function stringFromDartString(string) {
	const totalLength = wasm.exports.$stringLength(string);
	let result = "";
	let index = 0;
	while (index < totalLength) {
		let chunkLength = Math.min(totalLength - index, 0xffff);
		const array = new Array(chunkLength);
		for (let i = 0; i < chunkLength; i++) {
			array[i] = wasm.exports.$stringRead(string, index++);
		}
		result += String.fromCharCode(...array);
	}
	return result;
}

function stringToDartString(string) {
	const length = string.length;
	let range = 0;
	for (let i = 0; i < length; i++) {
		range |= string.codePointAt(i);
	}
	if (range < 256) {
		const dartString = wasm.exports.$stringAllocate1(length);
		for (let i = 0; i < length; i++) {
			wasm.exports.$stringWrite1(dartString, i, string.codePointAt(i));
		}
		return dartString;
	} else {
		const dartString = wasm.exports.$stringAllocate2(length);
		for (let i = 0; i < length; i++) {
			wasm.exports.$stringWrite2(dartString, i, string.charCodeAt(i));
		}
		return dartString;
	}
}

export function format(source, filename, config = {}) {
	const options = { lineEnding: "\n" };
	if (config.line_width) {
		options.pageWidth = config.line_width;
	}
	if (options.line_ending === "crlf") {
		options.lineEnding = "\r\n";
	}

	const sourceString = stringToDartString(source);
	const filenameString = stringToDartString(filename);
	const configString = stringToDartString(JSON.stringify(options));
	const result = wasm.exports.format(
		sourceString,
		filenameString,
		configString,
	);
	return stringFromDartString(result);
}
