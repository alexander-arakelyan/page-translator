package org.bambrikii.lang.pagetranslator.orm;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Getter
@Setter
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(name = "usage_word_ux", columnNames = "word_id")})
public class Usage {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private Word word;
    @Column
    private Integer searchCount = 0;
}
