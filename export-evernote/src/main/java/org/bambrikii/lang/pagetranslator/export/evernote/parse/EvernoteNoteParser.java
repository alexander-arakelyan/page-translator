package org.bambrikii.lang.pagetranslator.export.evernote.parse;

import org.bambrikii.lang.pagetranslator.export.model.ExportTag;
import org.bambrikii.lang.pagetranslator.export.model.ExportWord;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public class EvernoteNoteParser {
    private final List<LanguageDetector> languageDetectors = Arrays.asList(
            new AmDetector(),
            new RuDetector(),
            new EnDetector()
    );

    public List<ExportWord> parse(String name, String value) {
        if (!StringUtils.hasText(name)) {
            return Collections.emptyList();
        }

        var lang = detectLanguage(name);

        var word = new ExportWord();
        word.setName(name);
        word.setLanguageCode(lang);

        Map<String, ExportWord> maps = new HashMap<>();
        maps.put(name, word);

        String[] contents = value.split("\\r?\\n");
        for (String content1 : contents) {
            if (!StringUtils.hasText(content1)) {
                continue;
            }
            int separator = content1.indexOf(" - ");
            if (separator > -1) {
                addTags(lang, maps, content1, separator);
            } else {
                addTags(word, content1);
            }
        }

        List<ExportWord> result = new ArrayList<>();
        result.addAll(maps.values());
        return result;
    }

    private void addTags(ExportWord word, String contents) {
        var contents0 = contents.split("[,;]");
        for (String content0 : contents0) {
            if (!StringUtils.hasText(content0)) {
                continue;
            }
            var name0 = trim(content0);
            var lang0 = detectLanguage(name0);
            word.getTags().add(createTag(name0, lang0));
        }
    }

    private void addTags(String lang, Map<String, ExportWord> maps, String contents, int separator) {
        var name1 = trim(contents.substring(0, separator));
        var contents1 = trim(contents.substring(separator + 3));
        var lang0 = detectLanguage(contents1);

        var word0 = maps.get(name1);
        if (word0 == null) {
            word0 = createExportWord(name1, lang);
            maps.put(name1, word0);
        }
        var contents0 = contents1.split("[,;]");
        for (String content0 : contents0) {
            if (!StringUtils.hasText(content0)) {
                continue;
            }
            var name0 = trim(content0);
            word0.getTags().add(createTag(name0, lang0));
        }
    }

    private static String trim(String str) {
        return str.replaceAll("[\" ,]*$", "").replaceAll("^[\" ,]*", "");
    }

    private static ExportWord createExportWord(String name, String lang) {
        ExportWord word = new ExportWord();
        word.setName(name);
        word.setLanguageCode(lang);
        return word;
    }

    private static ExportTag createTag(String name, String lang) {
        ExportTag tag = new ExportTag();
        tag.setName(name);
        tag.setLanguageCode(lang);
        return tag;
    }

    private String detectLanguage(String content) {
        return languageDetectors
                .stream()
                .map(languageDetector -> languageDetector.detectCode(content))
                .filter(Objects::nonNull)
                .findFirst()
                .orElse("en");
    }
}
