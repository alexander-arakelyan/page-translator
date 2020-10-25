package org.bambrikii.lang.pagetranslator.words;

import org.bambrikii.lang.pagetranslator.languages.LangRepository;
import org.bambrikii.lang.pagetranslator.model.Language;
import org.bambrikii.lang.pagetranslator.model.Word;
import org.springframework.beans.factory.annotation.Autowired;
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
import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<List<WordClient>> list(@RequestParam String content) {

        List<WordClient> wordsClient = wordRepository
                .findByWordLike(content)
                .stream()
                .map(wordConverter::toClient)
                .collect(Collectors.toList());

        return ResponseEntity.ok(wordsClient);
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
        Language lang = langRepository.findByCode(wordClient.getLang());
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
