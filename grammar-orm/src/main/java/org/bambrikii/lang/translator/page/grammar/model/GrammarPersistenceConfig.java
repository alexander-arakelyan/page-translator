package org.bambrikii.lang.translator.page.grammar.model;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EntityScan(basePackageClasses = {GrammarPage.class})
@EnableJpaRepositories(basePackageClasses = {GrammarPageRepo.class})
@Configuration
public class GrammarPersistenceConfig {
}
