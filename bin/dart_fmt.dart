import 'dart:io';

import 'package:dart_fmt/dart_fmt.dart' as dart_fmt;

void main(List<String> arguments) {
  if (arguments.isEmpty) {
    print('Usage: dart_fmt <filename>');
    exit(1);
  }

  final filename = arguments[0];
  final source = File(filename).readAsStringSync();
  final formatted = dart_fmt.format(source, filename);

  print(formatted);
}
