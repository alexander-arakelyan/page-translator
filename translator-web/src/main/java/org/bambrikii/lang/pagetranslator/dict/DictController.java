package org.bambrikii.lang.pagetranslator.dict;

import org.bambrikii.lang.pagetranslator.languages.LangClient;
import org.bambrikii.lang.pagetranslator.orm.LangRepository;
import org.bambrikii.lang.pagetranslator.orm.WordRepository;
import org.bambrikii.lang.pagetranslator.utils.RestApiV1;
import org.bambrikii.lang.pagetranslator.words.WordDto;
import org.springframework.web.bind.annotation.RequestMapping;

@RestApiV1
public class DictController {
    private final WordRepository wordRepository;
    private final LangRepository langRepository;

    public DictController(WordRepository wordRepository, LangRepository langRepository) {
        this.wordRepository = wordRepository;
        this.langRepository = langRepository;
    }

    @RequestMapping("/dict")
    public void listTranslations(WordDto wordClient, LangClient langClient) {
        Long wordId = wordClient.getId();
        Long langId = langClient.getId();
//        wordRepository.findTags(wordId);
    }
}
