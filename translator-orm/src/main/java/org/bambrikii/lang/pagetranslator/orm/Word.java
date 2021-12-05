package org.bambrikii.lang.pagetranslator.orm;

import lombok.Getter;
import lombok.Setter;
import org.bambrikii.security.orm.User;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Alexander Arakelyan on 06/04/18 23:21.
 */
@Entity
@Table(uniqueConstraints = {
        @UniqueConstraint(columnNames = {"name", "lang_id"})
})
@Getter
@Setter
public class Word {
    @Id
    @GeneratedValue
    private Long id;
    @Column(nullable = false, updatable = false)
    private String name;
    @ManyToOne(optional = false)
    private Language lang;
    @ManyToMany
    private List<Tag> tags = new ArrayList<>();
    @ManyToOne
    private User createdBy;
}
