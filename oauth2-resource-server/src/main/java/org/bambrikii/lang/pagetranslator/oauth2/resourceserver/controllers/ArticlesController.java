package org.bambrikii.lang.pagetranslator.oauth2.resourceserver.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ArticlesController {

    @GetMapping("/articles")
    public @ResponseBody String[] getArticles() {
        return new String[]{"Article 1", "Article 2", "Article 3"};
    }

    @GetMapping("/articles/1")
    public @ResponseBody String[] getArticles1() {
        return new String[]{"Article 1", "Article 2", "Article 3"};
    }
}
