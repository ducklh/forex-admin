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
 * A Platform.
 */
@Document(collection = "platform")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Platform implements Serializable {

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

    public Platform id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getValue() {
        return this.value;
    }

    public Platform value(String value) {
        this.setValue(value);
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getValueEn() {
        return this.valueEn;
    }

    public Platform valueEn(String valueEn) {
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
            this.forexBrokers.forEach(i -> i.removeForexPlatforms(this));
        }
        if (forexBrokers != null) {
            forexBrokers.forEach(i -> i.addForexPlatforms(this));
        }
        this.forexBrokers = forexBrokers;
    }

    public Platform forexBrokers(Set<ForexBroker> forexBrokers) {
        this.setForexBrokers(forexBrokers);
        return this;
    }

    public Platform addForexBrokers(ForexBroker forexBroker) {
        this.forexBrokers.add(forexBroker);
        forexBroker.getForexPlatforms().add(this);
        return this;
    }

    public Platform removeForexBrokers(ForexBroker forexBroker) {
        this.forexBrokers.remove(forexBroker);
        forexBroker.getForexPlatforms().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Platform)) {
            return false;
        }
        return getId() != null && getId().equals(((Platform) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Platform{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", valueEn='" + getValueEn() + "'" +
            "}";
    }
}
