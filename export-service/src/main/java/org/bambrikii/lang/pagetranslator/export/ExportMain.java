package org.bambrikii.lang.pagetranslator.export;

import org.bambrikii.lang.pagetranslator.export.config.MainConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

@SpringBootApplication
public class ExportMain implements ApplicationListener<ContextRefreshedEvent> {
    public static void main(String[] args) {
        SpringApplication.run(MainConfig.class, args);
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {

    }
}
