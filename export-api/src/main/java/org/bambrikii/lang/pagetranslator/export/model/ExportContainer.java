package org.bambrikii.lang.pagetranslator.export.model;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ExportContainer {
    private List<ExportWord> words;
    private List<ExportArticle> articles;
}
