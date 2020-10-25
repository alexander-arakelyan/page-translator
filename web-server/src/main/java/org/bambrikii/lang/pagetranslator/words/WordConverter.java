package org.bambrikii.lang.pagetranslator.words;

import org.bambrikii.lang.pagetranslator.languages.LangRepository;
import org.bambrikii.lang.pagetranslator.model.Word;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WordConverter {
    @Autowired
    private WordRepository wordRepository;
    @Autowired
    private LangRepository langRepository;

    public WordClient toClient(Word word) {
        return new WordClient(word.getId(), word.getContent(), word.getLang().getCode());
    }

    public Word toPersistent(WordClient wordClient) {
        Long id = wordClient.getId();
        Word word = id != null && !Long.valueOf(0).equals(id)
                ? wordRepository.findById(id).get()
                : new Word();
        word.setContent(wordClient.getContent());
        word.setLang(langRepository.findByCode(wordClient.getLang()));
        return word;
    }
}
