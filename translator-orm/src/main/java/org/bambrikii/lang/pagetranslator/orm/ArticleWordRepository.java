package org.bambrikii.lang.pagetranslator.orm;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ArticleWordRepository extends CrudRepository<ArticleWord, Long> {
    Page<ArticleWord> findByArticleIdOrderByCountDesc(Long articleId, Pageable paging);

    Optional<ArticleWord> findByArticleIdAndWordId(Long articleId, Long wordId);
}
