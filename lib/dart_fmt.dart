import 'dart:convert';

import 'package:dart_style/dart_style.dart';

String format(String source, String filename,
    {int? pageWidth, String? lineEnding}) {
  final formatter = DartFormatter(pageWidth: pageWidth, lineEnding: lineEnding);
  return formatter.format(source, uri: filename);
}

class Options {
  final int? pageWidth;
  final String? lineEnding;

  Options.fromJson(Map<String, dynamic> json)
      : pageWidth = json['pageWidth'] as int?,
        lineEnding = json['lineEnding'] as String?;
}

@pragma('wasm:export', "format")
String formatExport(String source, String filename, String options) {
  final config = Options.fromJson(jsonDecode(options));

  return format(source, filename,
      pageWidth: config.pageWidth, lineEnding: config.lineEnding);
}

void main(List<String> arguments) {
  print("Hello, dart_fmt!");
}
