package org.bambrikii.lang.pagetranslator.orm;

import org.bambrikii.lang.translator.page.lang.orm.Language;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends CrudRepository<Tag, Long> {
    Optional<Tag> findByNameAndLang(String content, Language lang);
}
