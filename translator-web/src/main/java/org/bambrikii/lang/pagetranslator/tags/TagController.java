package org.bambrikii.lang.pagetranslator.tags;

import org.bambrikii.lang.pagetranslator.orm.LangRepository;
import org.bambrikii.lang.pagetranslator.orm.Language;
import org.bambrikii.lang.pagetranslator.orm.Tag;
import org.bambrikii.lang.pagetranslator.orm.TagRepository;
import org.bambrikii.lang.pagetranslator.utils.RestApiV1;
import org.bambrikii.lang.pagetranslator.words.TagDto;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.transaction.Transactional;

@RestApiV1
public class TagController {
    private final LangRepository langRepository;
    private final TagRepository tagRepository;
    private final TagConverter tagConverter;

    public TagController(
            LangRepository langRepository,
            TagRepository tagRepository,
            TagConverter tagConverter
    ) {
        this.langRepository = langRepository;
        this.tagRepository = tagRepository;
        this.tagConverter = tagConverter;
    }

    @PostMapping("/tags")
    @Transactional
    public TagDto add(String name, String langCode) {
        Tag tag = new Tag();
        tag.setName(name);
        Language lang = langRepository.findByCode(langCode);
        tag.setLang(lang);
        tagRepository.save(tag);
        return tagConverter.toClient(tag);
    }

    @RequestMapping("/tags")
    @PutMapping(value = "/tags/{id}")
    @Transactional
    public TagDto update(@PathVariable Long id, String name) {
        Tag tag = tagRepository.findById(id).get();
        tag.setName(name);
        tagRepository.save(tag);
        return tagConverter.toClient(tag);
    }

    @DeleteMapping(value = "/tags/{id}")
    @Transactional
    public TagDto remove(@PathVariable Long id) {
        Tag tag = tagRepository.findById(id).get();
        tagRepository.delete(tag);
        return tagConverter.toClient(tag);
    }
}
