package org.bambrikii.lang.pagetranslator.config;

import org.bambrikii.lang.pagetranslator.articles.ArticleController;
import org.bambrikii.lang.pagetranslator.articleword.ArticleWordController;
import org.bambrikii.lang.pagetranslator.dict.DictController;
import org.bambrikii.lang.pagetranslator.languages.LangController;
import org.bambrikii.lang.pagetranslator.tags.TagController;
import org.bambrikii.lang.pagetranslator.usage.UsageController;
import org.bambrikii.lang.pagetranslator.words.WordController;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * Created by Alexander Arakelyan on 06/04/18 20:14.
 */
//@EnableWebMvc
@Configuration
@ComponentScan(basePackageClasses = {
        WordController.class,
        LangController.class,
        UsageController.class,
        DictController.class,
        TagController.class,
        ArticleController.class,
        ArticleWordController.class
})
public class WebMvcConfig implements WebMvcConfigurer {
    private static final String[] CLASSPATH_RESOURCE_LOCATIONS = {"classpath:/public/"};

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
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
