package org.bambrikii.lang.pagetranslator.articles;

import org.bambrikii.lang.pagetranslator.orm.Article;
import org.bambrikii.lang.pagetranslator.orm.Language;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ArticleConverter {
    public ArticleDto toDto(Article article) {
        ArticleDto dto = new ArticleDto();
        BeanUtils.copyProperties(article, dto);
        Language lang = article.getLang();
        dto.setLangCode(lang.getCode());
        dto.setLangName(lang.getName());
        return dto;
    }

    public Article toPersistent(ArticleDto dto, Function<String, Language> langLookup) {
        return toPersistent(dto, new Article(), langLookup);
    }

    public Article toPersistent(ArticleDto dto, Article article, Function<String, Language> langLookup) {
        BeanUtils.copyProperties(dto, article, new String[]{"id", "createdAt", "updatedAt"});
        article.setLang(langLookup.apply(dto.getLangCode()));
        return article;
    }
}
