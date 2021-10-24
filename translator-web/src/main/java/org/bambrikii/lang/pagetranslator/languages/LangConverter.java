package org.bambrikii.lang.pagetranslator.languages;

import org.bambrikii.lang.pagetranslator.orm.LangRepository;
import org.bambrikii.lang.pagetranslator.orm.Language;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LangConverter {
    @Autowired
    private LangRepository langRepository;

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
