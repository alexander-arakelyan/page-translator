package org.bambrikii.lang.translator.page.lang.orm;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LangRepository extends CrudRepository<Language, Long> {
    Language findByCode(String code);
}
