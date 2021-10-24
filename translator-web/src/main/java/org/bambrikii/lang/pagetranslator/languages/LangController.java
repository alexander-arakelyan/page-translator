package org.bambrikii.lang.pagetranslator.languages;

import org.bambrikii.lang.pagetranslator.orm.LangRepository;
import org.bambrikii.lang.pagetranslator.orm.Language;
import org.bambrikii.lang.pagetranslator.utils.RestApiV1;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.GetMapping;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestApiV1
public class LangController {
    private final LangRepository langRepository;
    private final LangConverter langConverter;

    public LangController(LangRepository langRepository, LangConverter langConverter) {
        this.langRepository = langRepository;
        this.langConverter = langConverter;
    }

    @GetMapping(value = "/langs")
    @Transactional
    public Page<LangDto> list() {

        Iterable<Language> languages = langRepository
                .findAll();

        List<LangDto> langDtos = new ArrayList<>();
        languages.forEach(language -> langDtos.add(langConverter.toClient(language)));

        return new PageImpl<>(langDtos);
    }
}
