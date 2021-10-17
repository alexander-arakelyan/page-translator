package org.bambrikii.lang.pagetranslator;

import org.bambrikii.lang.pagetranslator.config.MainConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;

/**
 * Created by Alexander Arakelyan on 06/04/18 20:09.
 */
@SpringBootApplication
public class PageTranslatorMain implements ApplicationListener<ContextRefreshedEvent> {
    public static void main(String[] args) {
        SpringApplication.run(MainConfig.class, args);
    }

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {

    }
}
