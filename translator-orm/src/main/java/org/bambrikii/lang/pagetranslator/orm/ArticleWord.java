package org.bambrikii.lang.pagetranslator.orm;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

@Data
@Entity
@Table(uniqueConstraints = @UniqueConstraint(columnNames = {"article_id", "word_id"}))
public class ArticleWord {
    @Id
    @GeneratedValue
    private Long id;
    @ManyToOne
    private Article article;
    @ManyToOne
    private Word word;
    @Column
    private Integer count = 0;
}
