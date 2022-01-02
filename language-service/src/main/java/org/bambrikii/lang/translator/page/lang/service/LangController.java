package org.bambrikii.lang.translator.page.lang.service;

import org.bambrikii.lang.translator.page.lang.orm.LangRepository;
import org.bambrikii.lang.translator.page.lang.orm.Language;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/")
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
