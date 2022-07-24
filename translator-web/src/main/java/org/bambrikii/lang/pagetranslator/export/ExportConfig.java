package org.bambrikii.lang.pagetranslator.export;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(
        basePackageClasses = ExportController.class
)
public class ExportConfig {
}
