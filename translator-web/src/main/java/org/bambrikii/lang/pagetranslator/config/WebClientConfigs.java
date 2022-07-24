package org.bambrikii.lang.pagetranslator.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.reactive.function.client.WebClient;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@EnableConfigurationProperties(PageTranslatorProps.class)
@Configuration
public class WebClientConfigs {
    private final PageTranslatorProps pageTranslatorProps;

    public WebClientConfigs(PageTranslatorProps pageTranslatorProps) {
        this.pageTranslatorProps = pageTranslatorProps;
    }

    @Bean
    public WebClient exportWebClient() {
        return WebClient.builder()
                .baseUrl(pageTranslatorProps.getExportServiceUrl())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .baseUrl(pageTranslatorProps.getExportServiceUrl())
                .build();
    }
}
