package org.bambrikii.lang.translator.page.grammar.service;

import org.bambrikii.lang.translator.page.grammar.model.GrammarPersistenceConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@Import({GrammarPersistenceConfig.class})
@Configuration
public class GrammarConfig {
}
