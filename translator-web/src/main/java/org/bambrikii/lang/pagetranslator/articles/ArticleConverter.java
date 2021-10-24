package org.bambrikii.lang.pagetranslator.articles;

import org.bambrikii.lang.pagetranslator.orm.Article;
import org.springframework.beans.BeanUtils;

public class ArticleConverter {
    public ArticleDto toDto(Article article) {
        ArticleDto dto = new ArticleDto();
        BeanUtils.copyProperties(article, dto);
        return dto;
    }

    public Article toPersistent(ArticleDto dto) {
        return toPersistent(dto, new Article());
    }

    public Article toPersistent(ArticleDto dto, Article article) {
        BeanUtils.copyProperties(dto, article, new String[]{"id", "createdAt", "updatedAt"});
        return article;
    }
}
