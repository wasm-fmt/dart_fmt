/* @ts-self-types="./dart_fmt_web.d.ts" */
let app, wasmModule;
import { formatWrapper, initSync as finalize_init } from "./dart_fmt.mjs";

async function load(input) {
	if (typeof Response === "function" && input instanceof Response) {
		if (typeof WebAssembly.compileStreaming === "function") {
			try {
				return await WebAssembly.compileStreaming(input, compileOptions);
			} catch (e) {
				const validResponse = input.ok && expectedResponseType(input.type);

				if (validResponse && input.headers.get("Content-Type") !== "application/wasm") {
					console.warn(
						"`WebAssembly.compileStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n",
						e,
					);
				} else {
					throw e;
				}
			}
		}

		const bytes = await input.arrayBuffer();
		return await WebAssembly.compile(bytes, compileOptions);
	} else {
		return await WebAssembly.compile(input, compileOptions);
	}

	function expectedResponseType(type) {
		switch (type) {
			case "basic":
			case "cors":
			case "default":
				return true;
		}
		return false;
	}
}

export function initSync(module_or_buffer) {
	if (app !== void 0) return app;

	if (!(module_or_buffer instanceof WebAssembly.Module)) {
		module_or_buffer = new WebAssembly.Module(module_or_buffer, compileOptions);
	}

	return (app = finalize_init(module_or_buffer, compileOptions));
}

export default async function initAsync(init_input) {
	if (app !== void 0) return app;

	if (init_input === void 0) {
		init_input = new URL("dart_fmt.wasm", import.meta.url);
	}

	if (
		typeof init_input === "string" ||
		(typeof Request === "function" && init_input instanceof Request) ||
		(typeof URL === "function" && init_input instanceof URL)
	) {
		init_input = fetch(init_input);
	}

	const module = await load(await init_input);

	return (app = finalize_init(module, compileOptions));
}

export function format(source, filename, options) {
	return formatWrapper(app, source, filename, options);
}

const compileOptions = { builtins: ["js-string"] };
