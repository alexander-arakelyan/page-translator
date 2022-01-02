package org.bambrikii.lang.pagetranslator.orm;

import lombok.Getter;
import lombok.Setter;
import org.bambrikii.lang.translator.page.lang.orm.Language;
import org.bambrikii.security.orm.User;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.UniqueConstraint;
import java.util.Calendar;

import static javax.persistence.TemporalType.TIMESTAMP;

@Getter
@Setter
@Entity
@Table(
        uniqueConstraints = @UniqueConstraint(columnNames = {"name", "lang_id"})
)
public class Tag {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false)
    private String name;
    @ManyToOne
    private Language lang;

    @ManyToOne
    private User createdBy;

    @CreationTimestamp
    @Temporal(TIMESTAMP)
    private Calendar createdAt;

    @UpdateTimestamp
    @Temporal(TIMESTAMP)
    @Column
    private Calendar updatedAt;
}
