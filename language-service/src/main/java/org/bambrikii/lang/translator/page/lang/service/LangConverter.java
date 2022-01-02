package org.bambrikii.lang.translator.page.lang.service;

import org.bambrikii.lang.translator.page.lang.orm.LangRepository;
import org.bambrikii.lang.translator.page.lang.orm.Language;
import org.springframework.stereotype.Service;

@Service
public class LangConverter {
    private final LangRepository langRepository;

    public LangConverter(LangRepository langRepository) {
        this.langRepository = langRepository;
    }

    public LangDto toClient(Language lang) {
        return new LangDto(lang.getId(), lang.getCode(), lang.getName());
    }

    public Language toPersistent(LangDto langDto) {
        Long id = langDto.getId();
        Language lang = id != null && !Long.valueOf(0).equals(id)
                ? langRepository.findById(id).get() :
                new Language();
        lang.setCode(langDto.getCode());
        return lang;
    }
}
