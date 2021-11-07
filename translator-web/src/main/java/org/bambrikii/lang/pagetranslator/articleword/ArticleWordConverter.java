package org.bambrikii.lang.pagetranslator.articleword;

import org.bambrikii.lang.pagetranslator.orm.ArticleWord;

public class ArticleWordConverter {
    public ArticleWordDto toDto(ArticleWord articleWord) {
        ArticleWordDto dto = new ArticleWordDto();
        dto.setArticleId(articleWord.getArticle().getId());
        dto.setWordId(articleWord.getWord().getId());
        dto.setCount(articleWord.getCount());
        return dto;
    }
}
