package org.bambrikii.lang.pagetranslator.languages;

import org.bambrikii.lang.pagetranslator.model.Language;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LangConverter {
    @Autowired
    private LangRepository langRepository;

    public LangClient toClient(Language lang) {
        return new LangClient(lang.getId(), lang.getCode(), lang.getName());
    }

    public Language toPersistent(LangClient langClient) {
        Long id = langClient.getId();
        Language lang = id != null && !Long.valueOf(0).equals(id)
                ? langRepository.findById(id).get() :
                new Language();
        lang.setCode(langClient.getCode());
        return lang;
    }
}
