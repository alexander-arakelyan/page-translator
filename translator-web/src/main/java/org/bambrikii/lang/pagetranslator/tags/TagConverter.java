package org.bambrikii.lang.pagetranslator.tags;

import org.bambrikii.lang.translator.page.lang.orm.Language;
import org.bambrikii.lang.pagetranslator.orm.Tag;
import org.bambrikii.lang.pagetranslator.orm.TagRepository;
import org.bambrikii.lang.pagetranslator.words.TagDto;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TagConverter {
    private final TagRepository tagRepository;

    public TagConverter(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    public TagDto toClient(Tag tag) {
        TagDto dto = new TagDto();

        dto.setId(tag.getId());

        dto.setName(tag.getName());

        Language lang = tag.getLang();
        dto.setLangCode(lang.getCode());
        dto.setLangName(lang.getName());

        return dto;
    }

    public List<TagDto> toClient(List<Tag> tags) {
        if (tags == null || tags.isEmpty()) {
            return Collections.emptyList();
        }
        return tags.stream().map(tag -> toClient(tag)).collect(Collectors.toList());
    }

    public Tag toPersistent(TagDto tagDto) {
        throw new UnsupportedOperationException("Not yet implemented");
    }
}
