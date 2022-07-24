package org.bambrikii.lang.pagetranslator.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;

@Getter
@Setter
@ConfigurationProperties(prefix = "page-translator")
public class PageTranslatorProps {
    private String exportServiceUrl;
}
