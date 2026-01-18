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

## Node.js / Deno / Bun

```javascript
import { format } from "@wasm-fmt/dart_fmt";

const source = `void main() { print('Hello, World!'); }`;

const formatted = format(source);
console.log(formatted);
```

## Bundler

dart_fmt does not support ESM Integration entry yet.
Try use other entry points like `./esm` or `./web` instead.

## Web

For web environments, you need to initialize WASM module manually:

```javascript
import init, { format } from "@wasm-fmt/dart_fmt/web";

await init();

const source = `void main() { print('Hello, World!'); }`;

const formatted = format(source);
console.log(formatted);
```

### Vite

```JavaScript
import init, { format } from "@wasm-fmt/dart_fmt/vite";

await init();
// ...
```

## Entry Points

- `.` - Auto-detects environment (Node.js uses node, default is ESM)
- `./node` - Node.js environment (no init required)
- `./esm` - ESM environments like Deno (no init required)
- `./web` - Web browsers (requires manual init)
- `./vite` - Vite bundler (requires manual init)

# Build from source

```bash
# 1. install Dart https://dart.dev/get-dart

# 2. clone this repo
git clone https://github.com/wasm-fmt/dart_fmt.git

# 3. install dependencies
dart pub get

# 4. build
npm run build

# 5. test
npm run test:node
```
