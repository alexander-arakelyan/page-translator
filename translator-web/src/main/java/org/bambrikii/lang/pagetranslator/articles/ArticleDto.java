package org.bambrikii.lang.pagetranslator.articles;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class ArticleDto {
    private Long id;
    private String title;
    private String link;
    private String content;
    private String langCode;
    private String langName;
    private Instant createdAt;
    private Instant updatedAt;
}
