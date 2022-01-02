package org.bambrikii.lang.pagetranslator.orm;

import org.bambrikii.lang.translator.page.lang.orm.LanguagePersistenceConfig;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Created by Alexander Arakelyan on 07/04/18 11:54.
 */
@Configuration
@EntityScan(basePackageClasses = {
        Word.class,
        Usage.class,
        Tag.class,
        Article.class,
        ArticleWord.class
})
@EnableJpaRepositories(basePackageClasses = {
        WordRepository.class,
        UsageRepository.class,
        TagRepository.class,
        ArticleRepository.class,
        ArticleWordRepository.class
})
@Import({
        LanguagePersistenceConfig.class
})
public class TranslatorPersistenceConfig {
}
