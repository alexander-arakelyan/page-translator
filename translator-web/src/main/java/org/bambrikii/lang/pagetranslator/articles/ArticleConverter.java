package org.bambrikii.lang.pagetranslator.articles;

import org.bambrikii.lang.translator.page.lang.orm.Language;
import org.bambrikii.lang.pagetranslator.orm.Article;
import org.bambrikii.security.orm.User;
import org.bambrikii.security.provider.UserPrincipal;
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

    public Article toPersistent(
            ArticleDto dto,
            UserPrincipal userPrincipal,
            Function<String, Language> langLookup,
            Function<UserPrincipal, User> userLookup
    ) {
        return toPersistent(dto, new Article(), userPrincipal, langLookup, userLookup);
    }

    public Article toPersistent(
            ArticleDto dto,
            Article article,
            UserPrincipal userPrincipal,
            Function<String, Language> langLookup,
            Function<UserPrincipal, User> userLookup
    ) {
        BeanUtils.copyProperties(dto, article, new String[]{"id", "createdAt", "updatedAt", "createdBy"});
        article.setLang(langLookup.apply(dto.getLangCode()));
        if (article.getCreatedBy() == null) {
            article.setCreatedBy(userLookup.apply(userPrincipal));
        }
        return article;
    }
}
