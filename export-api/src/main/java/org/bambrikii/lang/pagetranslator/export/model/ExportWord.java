package org.bambrikii.lang.pagetranslator.export.model;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class ExportWord {
    private String name;
    private String languageCode;
    private List<ExportTag> tags = new ArrayList<>();
}
