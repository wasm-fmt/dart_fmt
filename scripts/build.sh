cd $(dirname $0)/..

dart compile wasm ./lib/dart_fmt.dart -o ./build/dart_fmt.wasm
cp -R ./extra/. ./build/
