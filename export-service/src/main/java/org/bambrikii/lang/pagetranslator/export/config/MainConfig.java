package org.bambrikii.lang.pagetranslator.export.config;

import org.bambrikii.lang.pagetranslator.export.api.ExportRestController;
import org.bambrikii.lang.pagetranslator.export.services.ExportService;
import org.bambrikii.lang.pagetranslator.orm.TranslatorPersistenceConfig;
import org.bambrikii.security.orm.SecurityPersistenceConfig;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@EnableAutoConfiguration
@Configuration
@ComponentScan(basePackageClasses = {
        ExportService.class,
        ExportRestController.class
})
@Import({
        TranslatorPersistenceConfig.class,
        SecurityPersistenceConfig.class
})
public class MainConfig {
}
