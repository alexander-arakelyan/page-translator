package org.bambrikii.lang.pagetranslator.words;

import org.bambrikii.lang.pagetranslator.languages.LangRepository;
import org.bambrikii.lang.pagetranslator.model.Language;
import org.bambrikii.lang.pagetranslator.model.Word;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
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
    @Autowired
    private WordRepository wordRepository;

    @Autowired
    private LangRepository langRepository;

    @Autowired
    private WordConverter wordConverter;

    @GetMapping
    @Transactional
    public ResponseEntity<Page<WordClient>> list(
            @RequestParam(required = false, defaultValue = "") String content,
            @RequestParam(defaultValue = "0") Integer pageNo,
            @RequestParam(defaultValue = "50") Integer pageSize,
            @RequestParam(defaultValue = "id") String sortBy
    ) {

        Page<WordClient> page = wordRepository
                .findByWordLike(content, PageRequest.of(pageNo, pageSize, Sort.by(sortBy)))
                .map(wordConverter::toClient);

        return ResponseEntity.ok(page);
    }

    @PutMapping(value = "")
    @Transactional
    public ResponseEntity<WordClient> add(@RequestBody WordClient wordClient) {

        Word word = wordConverter.toPersistent(wordClient);
        wordRepository.save(word);

        WordClient result = wordConverter.toClient(word);

        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/{id}")
    @Transactional
    public ResponseEntity<WordClient> update(@RequestParam Long id, @RequestBody WordClient wordClient) {

        Word word = wordRepository.findById(id).get();
        Language lang = langRepository.findByCode(wordClient.getLangCode());
        word.setContent(wordClient.getContent());
        word.setLang(lang);
        wordRepository.save(word);

        WordClient result = wordConverter.toClient(word);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping(value = "/{id}")
    @Transactional
    public ResponseEntity<Boolean> remove(Long id) {
        wordRepository.delete(wordRepository.findById(id).get());
        return ResponseEntity.ok(Boolean.TRUE);
    }
}
