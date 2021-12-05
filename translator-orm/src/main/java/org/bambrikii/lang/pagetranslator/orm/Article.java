package org.bambrikii.lang.pagetranslator.orm;

import lombok.Getter;
import lombok.Setter;
import org.bambrikii.security.orm.User;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
public class Article {
    @Id
    @GeneratedValue
    private Long id;
    @Column
    private String title;
    @Column
    private String link;
    @Column
    @Lob
    private String content;

    @Lob
    private String draft;

    @ManyToOne
    private Language lang;

    @OneToMany
    private Set<ArticleWord> words = new HashSet<>();

    @CreationTimestamp
    private Instant createdAt;
    @UpdateTimestamp
    private Instant updatedAt;
    @ManyToOne
    private User createdBy;
}
