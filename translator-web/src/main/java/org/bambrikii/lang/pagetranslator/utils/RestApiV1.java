package org.bambrikii.lang.pagetranslator.utils;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
@RestController
@RequestMapping("api/v1/")
public @interface RestApiV1 {
}
