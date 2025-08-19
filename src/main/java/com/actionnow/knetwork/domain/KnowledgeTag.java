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
 * A KnowledgeTag.
 */
@Document(collection = "knowledge_tag")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class KnowledgeTag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("value")
    private String value;

    @Field("value_en")
    private String valueEn;

    @DBRef
    @Field("knowledgeItems")
    @JsonIgnoreProperties(value = { "tags" }, allowSetters = true)
    private Set<KnowledgeItem> knowledgeItems = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public KnowledgeTag id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getValue() {
        return this.value;
    }

    public KnowledgeTag value(String value) {
        this.setValue(value);
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getValueEn() {
        return this.valueEn;
    }

    public KnowledgeTag valueEn(String valueEn) {
        this.setValueEn(valueEn);
        return this;
    }

    public void setValueEn(String valueEn) {
        this.valueEn = valueEn;
    }

    public Set<KnowledgeItem> getKnowledgeItems() {
        return this.knowledgeItems;
    }

    public void setKnowledgeItems(Set<KnowledgeItem> knowledgeItems) {
        if (this.knowledgeItems != null) {
            this.knowledgeItems.forEach(i -> i.removeTags(this));
        }
        if (knowledgeItems != null) {
            knowledgeItems.forEach(i -> i.addTags(this));
        }
        this.knowledgeItems = knowledgeItems;
    }

    public KnowledgeTag knowledgeItems(Set<KnowledgeItem> knowledgeItems) {
        this.setKnowledgeItems(knowledgeItems);
        return this;
    }

    public KnowledgeTag addKnowledgeItems(KnowledgeItem knowledgeItem) {
        this.knowledgeItems.add(knowledgeItem);
        knowledgeItem.getTags().add(this);
        return this;
    }

    public KnowledgeTag removeKnowledgeItems(KnowledgeItem knowledgeItem) {
        this.knowledgeItems.remove(knowledgeItem);
        knowledgeItem.getTags().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof KnowledgeTag)) {
            return false;
        }
        return getId() != null && getId().equals(((KnowledgeTag) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "KnowledgeTag{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", valueEn='" + getValueEn() + "'" +
            "}";
    }
}
