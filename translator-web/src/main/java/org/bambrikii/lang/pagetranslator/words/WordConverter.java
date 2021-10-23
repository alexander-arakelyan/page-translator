package org.bambrikii.lang.pagetranslator.words;

import org.bambrikii.lang.pagetranslator.orm.LangRepository;
import org.bambrikii.lang.pagetranslator.orm.Language;
import org.bambrikii.lang.pagetranslator.orm.Word;
import org.bambrikii.lang.pagetranslator.orm.WordRepository;
import org.bambrikii.lang.pagetranslator.tags.TagConverter;
import org.springframework.stereotype.Service;

@Service
public class WordConverter {
    private final WordRepository wordRepository;
    private final LangRepository langRepository;
    private final TagConverter tagConverter;

    public WordConverter(
            WordRepository wordRepository,
            LangRepository langRepository,
            TagConverter tagConverter
    ) {
        this.wordRepository = wordRepository;
        this.langRepository = langRepository;
        this.tagConverter = tagConverter;
    }

    public WordDto toClient(Word word) {
        Language lang = word.getLang();
        return new WordDto(
                word.getId(),
                word.getName(),
                lang.getCode(),
                lang.getName(),
                tagConverter.toClient(word.getTags())
        );
    }

    public Word toPersistent(WordDto wordClient) {
        Long id = wordClient.getId();
        Word word = id != null && !Long.valueOf(0).equals(id)
                ? wordRepository.findById(id).get()
                : new Word();
        word.setName(wordClient.getName());
        word.setLang(langRepository.findByCode(wordClient.getLangCode()));
        return word;
    }
}
