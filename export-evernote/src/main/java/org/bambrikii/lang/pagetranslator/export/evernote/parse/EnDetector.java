package org.bambrikii.lang.pagetranslator.export.evernote.parse;

public class EnDetector implements LanguageDetector {
    @Override
    public String detectCode(String content) {
        for (int i = 0; i < content.length(); i++) {
            char ch = content.charAt(i);
            if ((ch >= 65 && ch <= 90) || (ch >= 97 && ch <= 122)) {
                return "en";
            }
        }
        return null;
    }
}
