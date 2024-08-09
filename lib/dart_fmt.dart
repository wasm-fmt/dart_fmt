import 'package:dart_style/dart_style.dart';

String format(String source, String filename,
    {int? pageWidth, String? lineEnding}) {
  final formatter = DartFormatter(pageWidth: pageWidth, lineEnding: lineEnding);
  return formatter.format(source, uri: filename);
}
