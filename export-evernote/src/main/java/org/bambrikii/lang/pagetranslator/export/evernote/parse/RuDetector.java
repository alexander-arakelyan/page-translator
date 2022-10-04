package org.bambrikii.lang.pagetranslator.export.evernote.parse;

public class RuDetector implements LanguageDetector {

    @Override
    public String detectCode(String content) {
        for (int i = 0; i < content.length(); i++) {
            char c = content.charAt(i);
            if ((c >= 1072 && c <= 1103) || (c >= 1040 && c <= 1071)) {
                return "ru";
            }
        }
        return null;
    }
}
