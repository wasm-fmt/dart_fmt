////////////////////////////////////////////////////////////////////////////////
export function initSync(module, compileOptions = { builtins: ["js-string"] }) {
	const app = new CompiledApp(module, compileOptions).instantiate();
	app.invokeMain();
	return app;
}

export function formatWrapper(app, source, filename = "stdin.dart", config = {}) {
	const options = { lineEnding: "\n" };
	if (config.line_width) {
		options.pageWidth = config.line_width;
	}
	if (config.line_ending === "crlf") {
		options.lineEnding = "\r\n";
	}
	if (config.language_version) {
		options.languageVersion = config.language_version;
	}

	const result = app.compiledApp.format(source, filename, JSON.stringify(options));
	if (result.success) {
		return result.code;
	}
	throw new Error(result.error);
}
