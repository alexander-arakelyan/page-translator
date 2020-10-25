package org.bambrikii.lang.pagetranslator.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * Created by Alexander Arakelyan on 06/04/18 23:21.
 */
@Entity
@Table
@Getter
@Setter
public class Word {
    @Id
    @GeneratedValue
    private Long id;
    private String content;
    @ManyToOne(optional = false)
    private Language lang;
}
