package org.bambrikii.lang.pagetranslator.languages;

import org.bambrikii.lang.pagetranslator.model.Language;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LangRepository extends CrudRepository<Language, Long> {
    Language findByCode(String code);
}
