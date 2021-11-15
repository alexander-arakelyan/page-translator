package org.bambrikii.lang.pagetranslator.articleword;

import org.bambrikii.lang.pagetranslator.orm.ArticleWord;
import org.bambrikii.lang.pagetranslator.orm.Language;
import org.bambrikii.lang.pagetranslator.orm.Word;
import org.springframework.stereotype.Service;

@Service
public class ArticleWordConverter {
    public ArticleWordDto toDto(ArticleWord articleWord) {
        ArticleWordDto dto = new ArticleWordDto();

        dto.setId(articleWord.getId());
        dto.setArticleId(articleWord.getArticle().getId());

        Word word = articleWord.getWord();
        dto.setWordId(word.getId());
        dto.setWordName(word.getName());
        dto.setCount(articleWord.getCount());

        Language lang = word.getLang();
        dto.setLangCode(lang.getCode());
        dto.setLangName(lang.getName());

        return dto;
    }
}
