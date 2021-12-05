package org.bambrikii.lang.pagetranslator.orm;

import org.bambrikii.security.orm.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ArticleRepository extends CrudRepository<Article, Long> {
    @Query("Select a from Article a where a.title like %:title%")
    Page<Article> findByTitleLike(@Param("title") String title, Pageable paging);

    @Query("Select a from Article a where a.createdBy = :createdBy and a.title like %:title%")
    Page<Article> findByCreatedByAndTitleLike(
            @Param("createdBy") User user,
            @Param("title") String title,
            Pageable paging
    );
}
