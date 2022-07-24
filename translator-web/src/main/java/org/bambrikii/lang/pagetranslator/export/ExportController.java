package org.bambrikii.lang.pagetranslator.export;

import org.bambrikii.lang.pagetranslator.export.model.ExportContainer;
import org.bambrikii.lang.pagetranslator.export.model.ImportContainer;
import org.bambrikii.lang.pagetranslator.utils.RestApiV1;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.reactive.function.client.WebClient;

@RestApiV1
public class ExportController {
    private final WebClient exportWebClient;

    public ExportController(WebClient exportWebClient) {
        this.exportWebClient = exportWebClient;
    }

    @GetMapping("/export")
    public ResponseEntity<ExportContainer> export() {
        ExportContainer response = exportWebClient
                .get()
                .uri("/api/v1/export")
                .retrieve()
                .bodyToFlux(ExportContainer.class)
                .blockFirst();
        return ResponseEntity.ok(response);
    }

    @GetMapping("/import")
    public ResponseEntity<ImportContainer> import1() {
        ImportContainer response = exportWebClient
                .get()
                .uri("/api/v1/import")
                .retrieve()
                .bodyToFlux(ImportContainer.class)
                .blockFirst();
        return ResponseEntity.ok(response);
    }
}
