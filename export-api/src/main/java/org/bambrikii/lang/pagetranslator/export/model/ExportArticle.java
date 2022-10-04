package org.bambrikii.lang.pagetranslator.export.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@ToString
@Getter
@Setter
public class ExportArticle {
    private String title;
    private String link;
    private String content;
    private String languageCode;
    private List<ExportArticleWord> words = new ArrayList<>();
}
