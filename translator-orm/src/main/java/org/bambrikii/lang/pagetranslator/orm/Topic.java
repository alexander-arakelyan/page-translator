package org.bambrikii.lang.pagetranslator.orm;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table
public class Topic {
    @Id
    @GeneratedValue
    private Long id;

    @Column(nullable = false)
    private String name;

    @ManyToOne
    private Topic parent;

    @ManyToMany
    private List<Article> articles = new ArrayList<>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "parent")
    private List<Topic> subtopics = new ArrayList<>();
}
