package org.bambrikii.lang.pagetranslator.export;

import org.bambrikii.lang.pagetranslator.export.config.ExportConfig;
import org.junit.jupiter.api.Test;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.test.context.SpringBootTest;

@EnableAutoConfiguration
@SpringBootTest(classes = ExportConfig.class)
public class ExportServiceTest {
    @Test
    public void shouldPrepareSchema() {
    }
}
