package org.bambrikii.lang.translator.page.grammar.model;

import lombok.Data;
import lombok.Getter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;

import java.util.Calendar;

import static javax.persistence.TemporalType.TIMESTAMP;

@Data
@Entity
@Table
public class GrammarPage {
    @Id
    @GeneratedValue
    private Long id;

    @Column
    private String content;

    @CreationTimestamp
    @Temporal(TIMESTAMP)
    private Calendar createdAt;

    @UpdateTimestamp
    @Temporal(TIMESTAMP)
    private Calendar updatedAt;
}
