package org.bambrikii.lang.pagetranslator.export.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@ToString
@Getter
@Setter
public class ExportContainer {
    private List<ExportWord> words;
    private List<ExportArticle> articles;
}
