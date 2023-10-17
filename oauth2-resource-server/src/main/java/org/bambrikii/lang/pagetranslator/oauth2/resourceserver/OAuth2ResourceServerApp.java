package org.bambrikii.lang.pagetranslator.oauth2.resourceserver;

import org.bambrikii.lang.pagetranslator.oauth2.resourceserver.config.ResourceServerConfig;
import org.bambrikii.lang.pagetranslator.oauth2.resourceserver.controllers.ArticlesController;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackageClasses = {
        ResourceServerConfig.class,
        ArticlesController.class
})
@SpringBootApplication
public class OAuth2ResourceServerApp {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(OAuth2ResourceServerApp.class, args);
    }
}
