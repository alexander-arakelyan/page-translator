package org.bambrikii.lang.pagetranslator.orm;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table
public class Tag {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private Word word;
    @ManyToOne
    private Word tag;
}
