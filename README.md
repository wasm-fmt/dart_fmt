[![Test](https://github.com/wasm-fmt/dart_fmt/actions/workflows/test.yml/badge.svg)](https://github.com/wasm-fmt/dart_fmt/actions/workflows/test.yml)

# Install

[![npm](https://img.shields.io/npm/v/@wasm-fmt/dart_fmt?color=00B4AB)](https://www.npmjs.com/package/@wasm-fmt/dart_fmt)

```bash
npm install @wasm-fmt/dart_fmt
```

[![jsr.io](https://jsr.io/badges/@fmt/dart-fmt?color=00B4AB)](https://jsr.io/@fmt/dart-fmt)

```bash
npx jsr add @fmt/dart-fmt
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

Add `"@wasm-fmt/dart_fmt"` to `optimizeDeps.exclude` in your vite config:

```JSON
{
    "optimizeDeps": {
        "exclude": ["@wasm-fmt/dart_fmt"]
    }
}
```

<details>
<summary>
If you cannot change the vite config, you can use another import entry

</summary>

```JavaScript
import init, { format } from "@wasm-fmt/dart_fmt/vite";

// ...
```

</details>