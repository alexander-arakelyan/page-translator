package org.bambrikii.lang.pagetranslator.export.api;

import org.bambrikii.lang.pagetranslator.export.model.ExportContainer;
import org.bambrikii.lang.pagetranslator.export.model.ImportContainer;
import org.bambrikii.lang.pagetranslator.export.services.ExportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
public class ExportRestController {
    private final ExportService exportService;

    public ExportRestController(ExportService exportService) {
        this.exportService = exportService;
    }

    @GetMapping(value = "/export")
    public ResponseEntity<ExportContainer> export() {
        ExportContainer result = exportService.export();
        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/import")
    public ResponseEntity<ImportContainer> import1(@RequestBody ImportContainer export) {
        ImportContainer result = exportService.import1(export);
        return ResponseEntity.ok(result);
    }
}
