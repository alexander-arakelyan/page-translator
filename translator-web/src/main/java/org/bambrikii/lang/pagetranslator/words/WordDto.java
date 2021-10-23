package org.bambrikii.lang.pagetranslator.words;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WordDto {
    private Long id;
    private String name;
    private String langCode;
    private String langName;
    private List<TagDto> tags = new ArrayList<>();
}
