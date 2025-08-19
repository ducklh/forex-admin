package com.actionnow.knetwork.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Tag.
 */
@Document(collection = "tag")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Tag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("value")
    private String value;

    @Field("value_en")
    private String valueEn;

    @DBRef
    @Field("siteNewsArticles")
    @JsonIgnoreProperties(value = { "tags" }, allowSetters = true)
    private Set<SiteNewsArticle> siteNewsArticles = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Tag id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getValue() {
        return this.value;
    }

    public Tag value(String value) {
        this.setValue(value);
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getValueEn() {
        return this.valueEn;
    }

    public Tag valueEn(String valueEn) {
        this.setValueEn(valueEn);
        return this;
    }

    public void setValueEn(String valueEn) {
        this.valueEn = valueEn;
    }

    public Set<SiteNewsArticle> getSiteNewsArticles() {
        return this.siteNewsArticles;
    }

    public void setSiteNewsArticles(Set<SiteNewsArticle> siteNewsArticles) {
        if (this.siteNewsArticles != null) {
            this.siteNewsArticles.forEach(i -> i.removeTags(this));
        }
        if (siteNewsArticles != null) {
            siteNewsArticles.forEach(i -> i.addTags(this));
        }
        this.siteNewsArticles = siteNewsArticles;
    }

    public Tag siteNewsArticles(Set<SiteNewsArticle> siteNewsArticles) {
        this.setSiteNewsArticles(siteNewsArticles);
        return this;
    }

    public Tag addSiteNewsArticles(SiteNewsArticle siteNewsArticle) {
        this.siteNewsArticles.add(siteNewsArticle);
        siteNewsArticle.getTags().add(this);
        return this;
    }

    public Tag removeSiteNewsArticles(SiteNewsArticle siteNewsArticle) {
        this.siteNewsArticles.remove(siteNewsArticle);
        siteNewsArticle.getTags().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tag)) {
            return false;
        }
        return getId() != null && getId().equals(((Tag) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tag{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", valueEn='" + getValueEn() + "'" +
            "}";
    }
}
