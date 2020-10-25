package org.bambrikii.lang.pagetranslator.config;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
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
        PersistenceConfig.class,
        WebMvcConfig.class
})
public class MainConfig {
}
