package org.bambrikii.lang.pagetranslator.export.config;

import org.bambrikii.security.orm.SecurityPersistenceConfig;
import org.bambrikii.security.provider.SecurityConfig;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;

@EnableAutoConfiguration
@Configuration
@Import({
        ExportConfig.class,
        SecurityPersistenceConfig.class,
        SecurityConfig.class
})
public class MainConfig {
}
