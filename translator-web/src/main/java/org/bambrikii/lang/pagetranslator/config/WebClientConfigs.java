package org.bambrikii.lang.pagetranslator.config;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.reactive.function.client.ExchangeStrategies;
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
        final int size = 16 * 1024 * 1024;
        final ExchangeStrategies strategies = ExchangeStrategies.builder()
                .codecs(codecs -> codecs.defaultCodecs().maxInMemorySize(size))
                .build();
        return WebClient.builder()
                .baseUrl(pageTranslatorProps.getExportServiceUrl())
                .defaultHeader(HttpHeaders.CONTENT_TYPE, APPLICATION_JSON_VALUE)
                .exchangeStrategies(strategies)
                .build();
    }
}
