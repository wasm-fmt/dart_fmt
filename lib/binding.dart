import 'dart:convert';
import 'dart:js_interop';
import 'package:dart_fmt/dart_fmt.dart';

class Options {
  final int? pageWidth;
  final String? lineEnding;
  final String? languageVersion;

  Options.fromJson(Map<String, dynamic> json)
      : pageWidth = json['pageWidth'] as int?,
        lineEnding = json['lineEnding'] as String?,
        languageVersion = json['languageVersion'] as String?;
}

/// Result object returned to JavaScript
@JS('Object')
extension type FormatResult._(JSObject _) implements JSObject {
  external factory FormatResult();

  external set success(bool value);
  external set code(String? value);
  external set error(String? value);
}

FormatResult formatWrapper(String source, String filename, String options) {
  final config = Options.fromJson(jsonDecode(options));
  final result = FormatResult();

  try {
    result.success = true;
    result.code = format(
      source,
      filename,
      pageWidth: config.pageWidth,
      lineEnding: config.lineEnding,
      version: config.languageVersion,
    );
  } catch (e) {
    result.success = false;
    result.error = e.toString();
  }

  return result;
}

@JS('format')
external set formatExport(JSFunction handler);

void main(List<String> arguments) {
  formatExport = formatWrapper.toJS;
}
