package org.bambrikii.lang.translator.page.lang.orm;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EntityScan(basePackageClasses = {Language.class,})
@EnableJpaRepositories(basePackageClasses = {LangRepository.class,})
public class LanguagePersistenceConfig {
}
