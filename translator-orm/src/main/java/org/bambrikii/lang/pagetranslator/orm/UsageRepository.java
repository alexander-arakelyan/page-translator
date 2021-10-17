package org.bambrikii.lang.pagetranslator.orm;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsageRepository extends CrudRepository<Usage, Long> {
    Optional<Usage> findByWord(Word word);
}
