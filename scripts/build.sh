cd $(dirname $0)/..

dart compile wasm ./lib/dart_fmt.dart -o ./build/dart_fmt.wasm
cp -LR ./extra/. ./build/

./scripts/package.mjs ./package.json
