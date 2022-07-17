package org.bambrikii.lang.pagetranslator.words;

import org.bambrikii.lang.translator.page.lang.orm.LangRepository;
import org.bambrikii.lang.translator.page.lang.orm.Language;
import org.bambrikii.lang.pagetranslator.orm.Tag;
import org.bambrikii.lang.pagetranslator.orm.TagRepository;
import org.bambrikii.lang.pagetranslator.orm.Word;
import org.bambrikii.lang.pagetranslator.orm.WordRepository;
import org.bambrikii.lang.pagetranslator.user.UserService;
import org.bambrikii.lang.pagetranslator.utils.RestApiV1;
import org.bambrikii.security.orm.User;
import org.bambrikii.security.provider.CurrentUser;
import org.bambrikii.security.provider.UserPrincipal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import javax.transaction.Transactional;
import java.util.Optional;

/**
 * Created by Alexander Arakelyan on 06/04/18 23:20.
 */
@RestApiV1
public class WordController {
    private final WordRepository wordRepository;
    private final LangRepository langRepository;
    private final WordConverter wordConverter;
    private final TagRepository tagRepository;
    private final UserService userService;

    public WordController(
            WordConverter wordConverter,
            LangRepository langRepository,
            WordRepository wordRepository,
            TagRepository tagRepository,
            UserService userService
    ) {
        this.wordConverter = wordConverter;
        this.langRepository = langRepository;
        this.wordRepository = wordRepository;
        this.tagRepository = tagRepository;
        this.userService = userService;
    }

    @GetMapping("/words")
    @Transactional
    public ResponseEntity<Page<WordDto>> list(
            @RequestParam(required = false, defaultValue = "") String name,
            @RequestParam(required = false) String langCode,
            Pageable pager
    ) {
        Language lang = langRepository.findByCode(langCode);
        Page<WordDto> page = wordRepository
                .findByNameLikeAndLang(
                        name,
                        lang,
                        pager
                )
                .map(wordConverter::toDto);

        return ResponseEntity.ok(page);
    }

    @GetMapping("/words/{id}")
    @Transactional
    public ResponseEntity<WordDto> retrieveById(@PathVariable Long id) {
        Optional<Word> wordOptional = wordRepository.findById(id);
        if (wordOptional.isEmpty()) {
            return null;
        }
        WordDto wordDto = wordConverter.toDto(wordOptional.get());
        return ResponseEntity.ok(wordDto);
    }

    @PutMapping("/words")
    @Transactional
    public ResponseEntity<WordDto> add(
            @RequestBody WordDto wordClient,
            @CurrentUser UserPrincipal userPrincipal
    ) {
        Word word = wordConverter.toPersistent(wordClient, userPrincipal, userService::retrieveUser);
        wordRepository.save(word);

        WordDto result = wordConverter.toDto(word);

        return ResponseEntity.ok(result);
    }

    @PostMapping(value = "/words/{id}")
    @Transactional
    public ResponseEntity<WordDto> update(
            @PathVariable Long id,
            @RequestBody WordDto wordClient,
            @CurrentUser UserPrincipal userPrincipal
    ) {

        Word word = wordRepository.findById(id).get();
        Language lang = langRepository.findByCode(wordClient.getLangCode());
        word.setName(wordClient.getName());
        word.setLang(lang);
        wordRepository.save(word);

        WordDto result = wordConverter.toDto(word);

        return ResponseEntity.ok(result);
    }

    @DeleteMapping(value = "/words/{id}")
    @Transactional
    public ResponseEntity<Boolean> remove(
            @PathVariable Long id,
            @CurrentUser UserPrincipal userPrincipal
    ) {
        wordRepository.delete(wordRepository.findById(id).get());
        return ResponseEntity.ok(Boolean.TRUE);
    }

    @PostMapping("/words/{wordId}/tags")
    @Transactional
    public WordDto addTag(
            @PathVariable Long wordId,
            @RequestBody Long tagId,
            @CurrentUser UserPrincipal userPrincipal
    ) {
        Optional<Word> wordOptional = wordRepository.findById(wordId);
        if (wordOptional.isEmpty()) {
            return null;
        }
        Word word = wordOptional.get();
        Optional<Tag> tagOptional = tagRepository.findById(tagId);
        Tag tag = tagOptional.get();
        Language lang = word.getLang();
        if (!word.getTags().contains(tag)) {
            word.getTags().add(tag);
            wordRepository.save(word);
        }
        return wordConverter.toDto(word);
    }

    @PostMapping("/words/{wordId}/tags/by-name")
    @Transactional
    public WordDto addTag(
            @PathVariable Long wordId,
            @RequestBody TagDto tagDto,
            @CurrentUser UserPrincipal userPrincipal
    ) {
        String tagName = tagDto.getName();
        Optional<Word> wordOptional = wordRepository.findById(wordId);
        if (wordOptional.isEmpty()) {
            return null;
        }
        Word word = wordOptional.get();
        Language lang = word.getLang();
        if (word
                .getTags()
                .stream()
                .filter(tag -> tagName.equals(tag.getName()) && lang.equals(tag.getLang()))
                .findAny()
                .isEmpty()
        ) {
            Optional<Tag> tagOptional = tagRepository.findByNameAndLang(tagName, lang);
            Tag tag = tagOptional.isPresent()
                    ? tagOptional.get()
                    : createTag(tagName, lang, userService.retrieveUser(userPrincipal));
            word.getTags().add(tag);
            wordRepository.save(word);
        }
        return wordConverter.toDto(word);
    }

    private Tag createTag(String tagName, Language lang, User user) {
        Tag tag;
        tag = new Tag();
        tag.setName(tagName);
        tag.setLang(lang);
        tag.setCreatedBy(user);
        tagRepository.save(tag);
        return tag;
    }

    @DeleteMapping("/words/{wordId}/tags")
    @Transactional
    public ResponseEntity<WordDto> removeTag(
            @PathVariable Long wordId,
            @RequestBody Tag tagDto,
            @CurrentUser UserPrincipal userPrincipal
    ) {
        Optional<Word> wordOptional = wordRepository.findById(wordId);
        if (wordOptional.isEmpty()) {
            return null;
        }
        Word word = wordOptional.get();
        Optional<Tag> tagOptional = tagRepository.findById(tagDto.getId());
        if (tagOptional.isEmpty()) {
            return null;
        }

        Tag tag = tagOptional.get();
        User user = userService.retrieveUser(userPrincipal);
        if (!user.equals(tag.getCreatedBy())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(wordConverter.toDto(word));
        }

        word.getTags().remove(tag);
        wordRepository.save(word);
        return ResponseEntity.ok(wordConverter.toDto(word));
    }
}
