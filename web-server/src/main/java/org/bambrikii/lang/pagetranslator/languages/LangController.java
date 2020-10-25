package org.bambrikii.lang.pagetranslator.languages;

import org.bambrikii.lang.pagetranslator.model.Language;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/languages")
public class LangController {
    @Autowired
    private LangRepository langRepository;

    @Autowired
    private LangConverter langConverter;

    @GetMapping(value = "/{content}")
    @Transactional
    public ResponseEntity<List<LangClient>> list() {

        Iterable<Language> languages = langRepository
                .findAll();

        List<LangClient> langClients = new ArrayList<>();
        languages.forEach(language -> langClients.add(langConverter.toClient(language)));

        return ResponseEntity.ok(langClients);
    }
}
