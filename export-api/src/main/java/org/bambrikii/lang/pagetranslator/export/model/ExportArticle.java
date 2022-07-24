package org.bambrikii.lang.pagetranslator.export.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ExportArticle {
    private String title;
    private String link;
    private String content;
    private String languageCode;
    private List<ExportArticleWord> words = new ArrayList<>();
}
