package org.bambrikii.lang.pagetranslator.articleword;

import io.micrometer.core.instrument.util.StringUtils;
import org.bambrikii.lang.pagetranslator.orm.Article;
import org.bambrikii.lang.pagetranslator.orm.ArticleRepository;
import org.bambrikii.lang.pagetranslator.orm.ArticleWord;
import org.bambrikii.lang.pagetranslator.orm.ArticleWordRepository;
import org.bambrikii.lang.pagetranslator.orm.Word;
import org.bambrikii.lang.pagetranslator.orm.WordRepository;
import org.bambrikii.lang.pagetranslator.user.UserService;
import org.bambrikii.lang.pagetranslator.utils.RestApiV1;
import org.bambrikii.security.provider.CurrentUser;
import org.bambrikii.security.provider.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;

@RestApiV1
public class ArticleWordController {
    private final ArticleWordRepository articleWordRepository;
    private final ArticleWordConverter articleWordConverter;
    private final ArticleRepository articleRepository;
    private final WordRepository wordRepository;
    private final UserService userService;

    public ArticleWordController(
            ArticleWordRepository articleWordRepository,
            ArticleWordConverter articleWordConverter,
            ArticleRepository articleRepository,
            WordRepository wordRepository,
            UserService userService
    ) {
        this.articleWordRepository = articleWordRepository;
        this.articleWordConverter = articleWordConverter;
        this.articleRepository = articleRepository;
        this.wordRepository = wordRepository;
        this.userService = userService;
    }

    @GetMapping("/articles/{articleId}/words")
    @Transactional
    public ResponseEntity<Page<ArticleWordDto>> listWords(
            @PathVariable Long articleId,
            @RequestParam(value = "word", required = false) String wordName,
            Pageable pager
    ) {

        Page<ArticleWord> articleWords = StringUtils.isNotBlank(wordName)
                ? articleWordRepository.findByArticleIdAndWordNameLike(articleId, wordName, pager)
                : articleWordRepository.findByArticleId(articleId, pager);
        Page<ArticleWordDto> page = articleWords
                .map(articleWordConverter::toDto);

        return ResponseEntity.ok(page);
    }

    @PutMapping("/articles/{articleId}/words/{wordId}")
    @Transactional
    public ResponseEntity<ArticleWordDto> incrementWord(
            @PathVariable Long articleId,
            @PathVariable Long wordId,
            @RequestBody ArticleWordDto dto,
            @CurrentUser UserPrincipal userPrincipal
    ) {
        Optional<ArticleWord> persistentOptional = articleWordRepository.findByArticleIdAndWordId(articleId, wordId);
        ArticleWord persistent;
        if (persistentOptional.isEmpty()) {
            Article article = articleRepository.findById(articleId).get();
            userService.validateUserIsSame(userPrincipal, article.getCreatedBy());
            Word word = wordRepository.findById(wordId).get();
            persistent = new ArticleWord();
            persistent.setArticle(article);
            persistent.setWord(word);
            persistent.setCount(1);
        } else {
            persistent = persistentOptional.get();
            userService.validateUserIsSame(userPrincipal, persistent.getArticle().getCreatedBy());
            persistent.setCount(persistent.getCount() + 1);
        }

        articleWordRepository.save(persistent);

        return ResponseEntity.ok(articleWordConverter.toDto(persistent));
    }

    @DeleteMapping("/articles/{articleId}/words/{wordId}")
    @Transactional
    public ResponseEntity<ArticleWordDto> decrementWord(
            @PathVariable Long articleId,
            @PathVariable Long wordId,
            @RequestBody ArticleWordDto dto,
            @CurrentUser UserPrincipal userPrincipal
    ) {
        Optional<ArticleWord> persistentOptional = articleWordRepository.findByArticleIdAndWordId(articleId, wordId);
        ArticleWord persistent;
        if (persistentOptional.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        persistent = persistentOptional.get();
        userService.validateUserIsSame(userPrincipal, persistent.getArticle().getCreatedBy());
        Integer count = persistent.getCount();
        if (count > 1) {
            persistent.setCount(count - 1);
            articleWordRepository.save(persistent);
        } else {
            articleWordRepository.delete(persistent);
        }
        return ResponseEntity.ok(articleWordConverter.toDto(persistent));
    }
}
