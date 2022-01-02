package org.bambrikii.lang.pagetranslator.config;

import org.bambrikii.lang.translator.page.lang.service.LanguageConfig;
import org.bambrikii.lang.pagetranslator.orm.TranslatorPersistenceConfig;
import org.bambrikii.lang.translator.page.grammar.service.GrammarConfig;
import org.bambrikii.security.orm.SecurityPersistenceConfig;
import org.bambrikii.security.provider.AppProperties;
import org.bambrikii.security.provider.SecurityConfig;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

/**
 * Created by Alexander Arakelyan on 06/04/18 20:13.
 */
@EnableAutoConfiguration
@Configuration
@ComponentScan
@Import({
        TranslatorPersistenceConfig.class,
        SecurityPersistenceConfig.class,
        WebMvcConfig.class,
        SecurityConfig.class,
        GrammarConfig.class,
        LanguageConfig.class,
})
@EnableConfigurationProperties(AppProperties.class)
public class MainConfig {
}
