#! /usr/bin/env node --test

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

import { format } from "../build/dart_fmt_node.js";

const test_root = fileURLToPath(import.meta.resolve("../test_data"));

for await (const case_name of fs.glob("**/*.unit", { cwd: test_root })) {
	if (case_name.startsWith(".")) {
		test.skip(case_name, () => {});
		continue;
	}

	const input_path = join(test_root, case_name);
	const snap_path = input_path + ".snap";

	const [input, expected] = await Promise.all([fs.readFile(input_path, "utf-8"), fs.readFile(snap_path, "utf-8")]);

	test(case_name, () => {
		const actual = format(input, case_name);
		assert.equal(actual, expected);
	});
}
