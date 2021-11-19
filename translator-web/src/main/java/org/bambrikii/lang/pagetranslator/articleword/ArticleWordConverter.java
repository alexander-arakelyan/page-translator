package org.bambrikii.lang.pagetranslator.articleword;

import org.bambrikii.lang.pagetranslator.orm.ArticleWord;
import org.bambrikii.lang.pagetranslator.orm.Language;
import org.bambrikii.lang.pagetranslator.orm.Word;
import org.bambrikii.lang.pagetranslator.tags.TagConverter;
import org.springframework.stereotype.Service;

@Service
public class ArticleWordConverter {
    private final TagConverter tagConverter;

    public ArticleWordConverter(TagConverter tagConverter) {
        this.tagConverter = tagConverter;
    }

    public ArticleWordDto toDto(ArticleWord articleWord) {
        ArticleWordDto dto = new ArticleWordDto();

        dto.setId(articleWord.getId());
        dto.setArticleId(articleWord.getArticle().getId());

        Word word = articleWord.getWord();
        dto.setWordId(word.getId());
        dto.setWordName(word.getName());
        dto.setCount(articleWord.getCount());
        dto.setTags(tagConverter.toClient(articleWord.getWord().getTags()));

        Language lang = word.getLang();
        dto.setLangCode(lang.getCode());
        dto.setLangName(lang.getName());

        return dto;
    }
}
