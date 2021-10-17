package org.bambrikii.lang.pagetranslator.orm;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * Created by Alexander Arakelyan on 06/04/18 23:22.
 */
@Entity
@Table(uniqueConstraints = {@UniqueConstraint(name = "lang_key", columnNames = {"code"})})
@Getter
@Setter
public class Language {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private String code;
    private String name;
}
