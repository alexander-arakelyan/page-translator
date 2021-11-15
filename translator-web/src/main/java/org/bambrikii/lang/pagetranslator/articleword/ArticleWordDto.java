package org.bambrikii.lang.pagetranslator.articleword;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleWordDto {
    private Long id;
    private Long articleId;
    private Long wordId;
    private String wordName;
    private String langCode;
    private String langName;
    private Integer count;
}
