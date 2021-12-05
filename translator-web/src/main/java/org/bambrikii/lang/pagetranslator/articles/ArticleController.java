package org.bambrikii.lang.pagetranslator.articles;

import org.bambrikii.lang.pagetranslator.orm.Article;
import org.bambrikii.lang.pagetranslator.orm.ArticleRepository;
import org.bambrikii.lang.pagetranslator.orm.LangRepository;
import org.bambrikii.lang.pagetranslator.orm.Language;
import org.bambrikii.lang.pagetranslator.user.UserService;
import org.bambrikii.lang.pagetranslator.utils.RestApiV1;
import org.bambrikii.security.orm.User;
import org.bambrikii.security.provider.CurrentUser;
import org.bambrikii.security.provider.UserPrincipal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Optional;
import java.util.function.Function;

@RestApiV1
public class ArticleController {
    private final ArticleRepository articleRepository;
    private final ArticleConverter articleConverter;
    private final Function<String, Language> langLookup;
    private final UserService userService;

    public ArticleController(
            ArticleRepository articleRepository,
            ArticleConverter articleConverter,
            LangRepository langRepository,
            UserService userService
    ) {
        this.articleRepository = articleRepository;
        this.articleConverter = articleConverter;
        langLookup = code -> langRepository.findByCode(code);
        this.userService = userService;
    }

    @GetMapping("/articles")
    @Transactional
    public ResponseEntity<Page<ArticleDto>> list(
            @RequestParam(required = false, defaultValue = "") String title,
            @RequestParam(defaultValue = "0") Integer pageNum,
            @RequestParam(defaultValue = "50") Integer pageSize,
            @RequestParam(defaultValue = "updatedAt") String sortBy,
            @CurrentUser UserPrincipal userPrincipal
    ) {
        User user = userService.retrieveUser(userPrincipal);
        Sort sort = Sort.by(Sort.Direction.DESC, sortBy);
        Page<ArticleDto> page = articleRepository
                .findByCreatedByAndTitleLike(
                        user,
                        title,
                        PageRequest.of(pageNum, pageSize, sort)
                )
                .map(articleConverter::toDto);

        return ResponseEntity.ok(page);
    }

    @GetMapping("/articles/{id}")
    @Transactional
    public ResponseEntity<ArticleDto> update(
            @PathVariable Long id
    ) {
        Optional<Article> articleOptional = articleRepository.findById(id);
        if (articleOptional.isEmpty()) {
            throw new IllegalArgumentException("Article " + id + " not found.");
        }
        Article article = articleOptional.get();
        ArticleDto dto = articleConverter.toDto(article);
        return ResponseEntity.ok(dto);
    }


    @PostMapping("/articles")
    @Transactional
    public ResponseEntity<ArticleDto> add(
            @RequestBody ArticleDto dto,
            @CurrentUser UserPrincipal userPrincipal
    ) {
        Article article = articleConverter.toPersistent(dto, userPrincipal, langLookup, userService::retrieveUser);
        dto = articleConverter.toDto(articleRepository.save(article));
        return ResponseEntity.ok(dto);
    }

    @PutMapping("/articles/{id}")
    @Transactional
    public ResponseEntity<ArticleDto> update(
            @PathVariable Long id,
            @RequestBody ArticleDto dto,
            @CurrentUser UserPrincipal userPrincipal
    ) {
        Optional<Article> articleOptional = articleRepository.findById(id);
        if (articleOptional.isEmpty()) {
            throw new IllegalArgumentException("Article " + id + " not found.");
        }
        Article article = articleOptional.get();
        article = articleConverter.toPersistent(dto, article, userPrincipal, langLookup, userService::retrieveUser);
        dto = articleConverter.toDto(articleRepository.save(article));
        return ResponseEntity.ok(dto);
    }

    @DeleteMapping("/articles/{id}")
    @Transactional
    public ResponseEntity<ArticleDto> remove(
            @PathVariable Long id,
            @CurrentUser UserPrincipal userPrincipal
    ) {
        Optional<Article> articleOptional = articleRepository.findById(id);
        if (articleOptional.isEmpty()) {
            throw new IllegalArgumentException("Article " + id + " not found.");
        }
        Article article = articleOptional.get();
        userService.validateUserIsSame(userPrincipal, article.getCreatedBy());
        articleRepository.delete(article);
        return ResponseEntity.ok(articleConverter.toDto(article));
    }
}
