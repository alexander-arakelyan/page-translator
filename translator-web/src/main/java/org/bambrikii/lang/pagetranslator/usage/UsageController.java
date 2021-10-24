package org.bambrikii.lang.pagetranslator.usage;

import org.bambrikii.lang.pagetranslator.orm.Usage;
import org.bambrikii.lang.pagetranslator.orm.UsageRepository;
import org.bambrikii.lang.pagetranslator.orm.Word;
import org.bambrikii.lang.pagetranslator.orm.WordRepository;
import org.bambrikii.lang.pagetranslator.utils.RestApiV1;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@RestApiV1
public class UsageController {
    private final WordRepository wordRepository;
    private final UsageRepository usageRepository;

    private final UsageConverter usageConverter;

    public UsageController(WordRepository wordRepository, UsageRepository usageRepository, UsageConverter usageConverter) {
        this.wordRepository = wordRepository;
        this.usageRepository = usageRepository;
        this.usageConverter = usageConverter;
    }

    @GetMapping("/usage/by-word/{id}")
    public ResponseEntity<UsageClient> usage(@RequestParam("id") Long id) {

        Word word = wordRepository.findById(id).get();
        Optional<Usage> usage = usageRepository.findByWord(word);
        if (!usage.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(usageConverter.toClient(usage.get()));
    }

    @GetMapping("/usage/by-word/{id}/inc")
    public ResponseEntity<UsageClient> increment(@RequestParam("id") Long id) {

        Word word = wordRepository.findById(id).get();
        Optional<Usage> usage = usageRepository.findByWord(word);

        Usage usage1;
        if (!usage.isPresent()) {
            usage1 = new Usage();
            usage1.setWord(word);
            usage1.setSearchCount(1);
        } else {
            usage1 = usage.get();
            usage1.setSearchCount(usage1.getSearchCount() + 1);
        }

        usageRepository.save(usage1);
        return ResponseEntity.ok(usageConverter.toClient(usage1));
    }
}
