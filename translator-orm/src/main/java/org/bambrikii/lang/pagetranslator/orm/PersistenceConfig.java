package org.bambrikii.lang.pagetranslator.orm;

import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Created by Alexander Arakelyan on 07/04/18 11:54.
 */
@Configuration
@EntityScan(basePackageClasses = {
        Word.class,
        Language.class,
        Usage.class,
        Tag.class,
        Article.class,
        ArticleWord.class
})
@EnableJpaRepositories(basePackageClasses = {
        WordRepository.class,
        LangRepository.class,
        UsageRepository.class,
        TagRepository.class,
        ArticleRepository.class,
        ArticleWordRepository.class
})
public class PersistenceConfig {
}
