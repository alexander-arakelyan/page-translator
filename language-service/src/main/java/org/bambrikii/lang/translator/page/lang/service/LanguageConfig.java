package org.bambrikii.lang.translator.page.lang.service;

import org.bambrikii.lang.translator.page.lang.orm.LanguagePersistenceConfig;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Import({LanguagePersistenceConfig.class})
@ComponentScan(basePackageClasses = {LangController.class})
@Configuration
public class LanguageConfig {
}
