package org.bambrikii.lang.pagetranslator.words;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WordClient {
    private Long id;
    private String content;
    private String langCode;
    private String langName;
}
