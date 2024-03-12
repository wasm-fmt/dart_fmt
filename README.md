[![Test](https://github.com/wasm-fmt/dart_fmt/actions/workflows/test.yml/badge.svg)](https://github.com/wasm-fmt/dart_fmt/actions/workflows/test.yml)

# Install

[![npm](https://img.shields.io/npm/v/@wasm-fmt/dart_fmt)](https://www.npmjs.com/package/@wasm-fmt/dart_fmt)

```bash
npm install @wasm-fmt/dart_fmt
```

# Usage

```javascript
import init, { format } from "@wasm-fmt/dart_fmt";

await init();

const input = `void main() { print('Hello, World!'); }`;

const formatted = format(input, "main.dart");
console.log(formatted);
```

For Vite users:

```JavaScript
import init, { format } from "@wasm-fmt/dart_fmt/vite";

// ...
```
