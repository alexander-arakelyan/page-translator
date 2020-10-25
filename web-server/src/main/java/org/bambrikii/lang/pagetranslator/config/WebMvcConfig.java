package org.bambrikii.lang.pagetranslator.config;

import org.bambrikii.lang.pagetranslator.languages.LangController;
import org.bambrikii.lang.pagetranslator.words.WordController;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

/**
 * Created by Alexander Arakelyan on 06/04/18 20:14.
 */
//@EnableWebMvc
@Configuration
@ComponentScan(basePackageClasses = {
        WordController.class,
        LangController.class
})
public class WebMvcConfig extends WebMvcConfigurerAdapter {
    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {"classpath:/public/"};

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        super.addResourceHandlers(registry);
        if (!registry.hasMappingForPattern("/webjars/**")) {
            registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
        }
        if (!registry.hasMappingForPattern("/**")) {
            registry.addResourceHandler("/**").addResourceLocations(CLASSPATH_RESOURCE_LOCATIONS);
        }

        if (!registry.hasMappingForPattern("swagger-ui.html")) {
            registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
        }
    }
}
