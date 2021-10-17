package org.bambrikii.lang.pagetranslator.orm;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Created by Alexander Arakelyan on 07/04/18 11:51.
 */
@Repository
public interface WordRepository extends PagingAndSortingRepository<Word, Long> {
    @Query("Select w from Word w join w.lang l where w.content like %:content% and l = :lang")
    Page<Word> findByWordLikeAndLang(@Param("content") String content, @Param("lang") Language lang, Pageable paging);
}
