package org.bambrikii.lang.pagetranslator.languages;

import org.bambrikii.lang.pagetranslator.orm.LangRepository;
import org.bambrikii.lang.pagetranslator.orm.Language;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/langs")
public class LangController {
    @Autowired
    private LangRepository langRepository;

    @Autowired
    private LangConverter langConverter;

    @GetMapping(value = "")
    @Transactional
    public Page<LangClient> list() {

        Iterable<Language> languages = langRepository
                .findAll();

        List<LangClient> langClients = new ArrayList<>();
        languages.forEach(language -> langClients.add(langConverter.toClient(language)));

        return new PageImpl<>(langClients);
    }
}
