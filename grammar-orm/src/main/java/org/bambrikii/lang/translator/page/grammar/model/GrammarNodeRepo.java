package org.bambrikii.lang.translator.page.grammar.model;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GrammarNodeRepo extends CrudRepository<GrammarNode, Long> {
}
