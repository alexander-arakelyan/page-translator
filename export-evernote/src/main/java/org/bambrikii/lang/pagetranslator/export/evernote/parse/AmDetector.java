package org.bambrikii.lang.pagetranslator.export.evernote.parse;

public class AmDetector implements LanguageDetector {
    @Override
    public String detectCode(String content) {
        for (int i = 0; i < content.length(); i++) {
            var ch = content.charAt(i);
            if ((ch >= 1377 && ch <= 1414) || (ch >= 1329 && ch <= 1366)) {
                return "am";
            }
        }
        return null;
    }
}
