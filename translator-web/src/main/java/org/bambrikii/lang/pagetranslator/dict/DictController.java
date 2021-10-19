package org.bambrikii.lang.pagetranslator.dict;

import org.bambrikii.lang.pagetranslator.languages.LangClient;
import org.bambrikii.lang.pagetranslator.orm.LangRepository;
import org.bambrikii.lang.pagetranslator.words.WordDto;
import org.bambrikii.lang.pagetranslator.orm.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dict")
public class DictController {
    @Autowired
    private WordRepository wordRepository;
    @Autowired
    private LangRepository langRepository;

    public void listTranslations(WordDto wordClient, LangClient langClient) {
        Long wordId = wordClient.getId();
        Long langId = langClient.getId();
//        wordRepository.findTags(wordId);
    }
}
