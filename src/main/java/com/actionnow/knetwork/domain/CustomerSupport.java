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
 * A CustomerSupport.
 */
@Document(collection = "customer_support")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CustomerSupport implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("value")
    private String value;

    @Field("value_en")
    private String valueEn;

    @DBRef
    @Field("cryptoBrokers")
    @JsonIgnoreProperties(
        value = {
            "cryptoFeatures", "supportedCoins", "cryptoPros", "cryptoCons", "securityFeatures", "paymentMethods", "customerSupports",
        },
        allowSetters = true
    )
    private Set<CryptoBroker> cryptoBrokers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public CustomerSupport id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getValue() {
        return this.value;
    }

    public CustomerSupport value(String value) {
        this.setValue(value);
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getValueEn() {
        return this.valueEn;
    }

    public CustomerSupport valueEn(String valueEn) {
        this.setValueEn(valueEn);
        return this;
    }

    public void setValueEn(String valueEn) {
        this.valueEn = valueEn;
    }

    public Set<CryptoBroker> getCryptoBrokers() {
        return this.cryptoBrokers;
    }

    public void setCryptoBrokers(Set<CryptoBroker> cryptoBrokers) {
        if (this.cryptoBrokers != null) {
            this.cryptoBrokers.forEach(i -> i.removeCustomerSupports(this));
        }
        if (cryptoBrokers != null) {
            cryptoBrokers.forEach(i -> i.addCustomerSupports(this));
        }
        this.cryptoBrokers = cryptoBrokers;
    }

    public CustomerSupport cryptoBrokers(Set<CryptoBroker> cryptoBrokers) {
        this.setCryptoBrokers(cryptoBrokers);
        return this;
    }

    public CustomerSupport addCryptoBrokers(CryptoBroker cryptoBroker) {
        this.cryptoBrokers.add(cryptoBroker);
        cryptoBroker.getCustomerSupports().add(this);
        return this;
    }

    public CustomerSupport removeCryptoBrokers(CryptoBroker cryptoBroker) {
        this.cryptoBrokers.remove(cryptoBroker);
        cryptoBroker.getCustomerSupports().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CustomerSupport)) {
            return false;
        }
        return getId() != null && getId().equals(((CustomerSupport) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CustomerSupport{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", valueEn='" + getValueEn() + "'" +
            "}";
    }
}
