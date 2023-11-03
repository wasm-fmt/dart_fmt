import 'package:dart_fmt/dart_fmt.dart';
import 'package:test/test.dart';

void main() {
  test('should format', () {
    expect(format("void main() { print('Hello, dart_fmt!'); }", "app.dart"),
        "void main() {\n  print('Hello, dart_fmt!');\n}\n");
  });

  test("should format with config", () {
    expect(
        formatExport("void main() { print('Hello, dart_fmt!'); }", "app.dart", "{}"),
        "void main() {\n  print('Hello, dart_fmt!');\n}\n");
  });
}
