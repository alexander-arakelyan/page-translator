package org.bambrikii.lang.pagetranslator.export;

import org.bambrikii.lang.pagetranslator.export.model.ExportContainer;
import org.bambrikii.lang.pagetranslator.export.model.ImportContainer;
import org.bambrikii.lang.pagetranslator.utils.RestApiV1;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.reactive.function.client.WebClient;

import static org.springframework.http.HttpHeaders.AUTHORIZATION;

@ConditionalOnMissingBean(name = {
        "exportController"
})
@RestApiV1
public class ExportFacadeController {
    private final WebClient exportWebClient;

    public ExportFacadeController(WebClient exportWebClient) {
        this.exportWebClient = exportWebClient;
    }

    @GetMapping("/export")
    public ResponseEntity<ExportContainer> export(
            @RequestHeader(value = AUTHORIZATION) String authorizationHeader
    ) {
        ExportContainer response = exportWebClient
                .get()
                .uri("/api/v1/export")
                .header(AUTHORIZATION, authorizationHeader)
                .retrieve()
                .bodyToFlux(ExportContainer.class)
                .blockFirst();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/import")
    public ResponseEntity<ImportContainer> import1(
            @RequestBody ImportContainer importContainer,
            @RequestHeader(value = AUTHORIZATION) String authorizationHeader
    ) {
        ImportContainer response = exportWebClient
                .post()
                .uri("/api/v1/import")
                .header(AUTHORIZATION, authorizationHeader)
                .bodyValue(importContainer)
                .retrieve()
                .bodyToFlux(ImportContainer.class)
                .blockFirst();
        return ResponseEntity.ok(response);
    }
}
