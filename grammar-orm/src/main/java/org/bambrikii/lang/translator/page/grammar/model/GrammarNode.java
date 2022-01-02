package org.bambrikii.lang.translator.page.grammar.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
public class GrammarNode {
    @Id
    @GeneratedValue
    private Long id;
}
