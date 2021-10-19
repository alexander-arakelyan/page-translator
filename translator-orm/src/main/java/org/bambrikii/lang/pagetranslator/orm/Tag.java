package org.bambrikii.lang.pagetranslator.orm;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table
public class Tag {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private Word root;
}
