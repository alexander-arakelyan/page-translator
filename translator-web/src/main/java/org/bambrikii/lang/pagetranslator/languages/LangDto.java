package org.bambrikii.lang.pagetranslator.languages;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LangDto {
    private Long id;
    private String code;
    private String name;
}
