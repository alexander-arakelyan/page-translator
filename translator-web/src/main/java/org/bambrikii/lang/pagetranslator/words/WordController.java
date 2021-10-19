package org.bambrikii.lang.pagetranslator.words;

import org.bambrikii.lang.pagetranslator.orm.LangRepository;
import org.bambrikii.lang.pagetranslator.orm.Language;
import org.bambrikii.lang.pagetranslator.orm.Word;
import org.bambrikii.lang.pagetranslator.orm.WordRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.transaction.Transactional;

/**
 * Created by Alexander Arakelyan on 06/04/18 23:20.
 */
@RestController
@RequestMapping("/words")
public class WordController {
    private final WordRepository wordRepository;
    private final LangRepository langRepository;
    private final WordConverter wordConverter;

    public WordController(WordConverter wordConverter, LangRepository langRepository, WordRepository wordRepository) {
        this.wordConverter = wordConverter;
        this.langRepository = langRepository;
        this.wordRepository = wordRepository;
    }

    @GetMapping
    @Transactional
    public ResponseEntity<Page<WordDto>> list(
            @RequestParam(required = false, defaultValue = "") String content,
            @RequestParam(defaultValue = "0") Integer pageNum,
            @RequestParam(defaultValue = "50") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy,
            @RequestParam(required = false) String langCode
    ) {
        Language lang = langRepository.findByCode(langCode);
        Page<WordDto> page = wordRepository
                .findByWordLikeAndLang(
                        content,
                        lang,
                        PageRequest.of(pageNum, pageSize, Sort.by(sortBy)))
                .map(wordConverter::toClient);

        return ResponseEntity.ok(page);
    }

    @PutMapping
    @Transactional
    public ResponseEntity<WordDto> add(@RequestBody WordDto wordClient) {
        Word word = wordConverter.toPersistent(wordClient);
        wordRepository.save(word);

        WordDto result = wordConverter.toClient(word);

        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/{id}")
    @Transactional
    public ResponseEntity<WordDto> update(@PathVariable Long id, @RequestBody WordDto wordClient) {

        Word word = wordRepository.findById(id).get();
        Language lang = langRepository.findByCode(wordClient.getLangCode());
        word.setContent(wordClient.getContent());
        word.setLang(lang);
        wordRepository.save(word);

        WordDto result = wordConverter.toClient(word);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping(value = "/{id}")
    @Transactional
    public ResponseEntity<Boolean> remove(@PathVariable Long id) {
        wordRepository.delete(wordRepository.findById(id).get());
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
