/**
 * WASM formatter for Dart.
 *
 * @example
 * ```ts
 * import { format } from "@wasm-fmt/dart_fmt";
 *
 * const input = "void main() { print('Hello, World!'); }";
 * const output = format(input, "main.dart");
 * ```
 *
 * @module
 */

interface LayoutConfig {
	/** The preferred line width at which the formatter should wrap lines */
	line_width?: number;
	/** The type of line ending to apply to the printed input */
	line_ending?: "lf" | "crlf";
}

/** Configuration for the Dart formatter */
export interface Config extends LayoutConfig {
	/** The Dart language version to use for formatting */
	language_version?: string;
}

/**
 * Format the entire Dart source code string.
 */
export function format(input: string, filename: string, config?: Config): string;
