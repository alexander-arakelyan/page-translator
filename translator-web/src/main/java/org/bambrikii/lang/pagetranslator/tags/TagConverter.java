package org.bambrikii.lang.pagetranslator.tags;

import org.bambrikii.lang.pagetranslator.orm.Language;
import org.bambrikii.lang.pagetranslator.orm.Tag;
import org.bambrikii.lang.pagetranslator.orm.TagRepository;
import org.bambrikii.lang.pagetranslator.orm.Word;
import org.bambrikii.lang.pagetranslator.words.TagDto;
import org.bambrikii.lang.pagetranslator.words.WordDto;
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
        WordDto dtoRoot = new WordDto();

        dto.setId(tag.getId());

        Word root = tag.getRoot();
        dtoRoot.setId(root.getId());

        Language rootLang = root.getLang();
        dtoRoot.setLangCode(rootLang.getCode());
        dtoRoot.setLangName(rootLang.getName());

        dto.setRoot(dtoRoot);

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
