package org.bambrikii.lang.pagetranslator.words;

import org.bambrikii.lang.pagetranslator.model.Word;
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
    @Query("Select w from Word w where w.content like %:content%")
    Page<Word> findByWordLike(@Param("content") String content, Pageable paging);
}
