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
 * A Pro.
 */
@Document(collection = "pro")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Pro implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("value")
    private String value;

    @Field("value_en")
    private String valueEn;

    @DBRef
    @Field("forexBrokers")
    @JsonIgnoreProperties(
        value = {
            "forexFeatures",
            "forexPlatforms",
            "forexInstruments",
            "forexPros",
            "forexCons",
            "forexLanguages",
            "forexSupports",
            "forexPaymentMethods",
        },
        allowSetters = true
    )
    private Set<ForexBroker> forexBrokers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Pro id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getValue() {
        return this.value;
    }

    public Pro value(String value) {
        this.setValue(value);
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getValueEn() {
        return this.valueEn;
    }

    public Pro valueEn(String valueEn) {
        this.setValueEn(valueEn);
        return this;
    }

    public void setValueEn(String valueEn) {
        this.valueEn = valueEn;
    }

    public Set<ForexBroker> getForexBrokers() {
        return this.forexBrokers;
    }

    public void setForexBrokers(Set<ForexBroker> forexBrokers) {
        if (this.forexBrokers != null) {
            this.forexBrokers.forEach(i -> i.removeForexPros(this));
        }
        if (forexBrokers != null) {
            forexBrokers.forEach(i -> i.addForexPros(this));
        }
        this.forexBrokers = forexBrokers;
    }

    public Pro forexBrokers(Set<ForexBroker> forexBrokers) {
        this.setForexBrokers(forexBrokers);
        return this;
    }

    public Pro addForexBrokers(ForexBroker forexBroker) {
        this.forexBrokers.add(forexBroker);
        forexBroker.getForexPros().add(this);
        return this;
    }

    public Pro removeForexBrokers(ForexBroker forexBroker) {
        this.forexBrokers.remove(forexBroker);
        forexBroker.getForexPros().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pro)) {
            return false;
        }
        return getId() != null && getId().equals(((Pro) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pro{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", valueEn='" + getValueEn() + "'" +
            "}";
    }
}
