package org.bambrikii.lang.pagetranslator.orm;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicRepo extends CrudRepository<Topic, Long> {
}
