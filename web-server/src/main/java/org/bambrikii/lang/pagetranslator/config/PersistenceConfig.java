package org.bambrikii.lang.pagetranslator.config;

import org.bambrikii.lang.pagetranslator.languages.LangRepository;
import org.bambrikii.lang.pagetranslator.model.Language;
import org.bambrikii.lang.pagetranslator.model.Word;
import org.bambrikii.lang.pagetranslator.words.WordRepository;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Created by Alexander Arakelyan on 07/04/18 11:54.
 */
@Configuration
@EntityScan(basePackageClasses = {
        Word.class,
        Language.class
})
@EnableJpaRepositories(basePackageClasses = {
        WordRepository.class,
        LangRepository.class
})
public class PersistenceConfig {
}
