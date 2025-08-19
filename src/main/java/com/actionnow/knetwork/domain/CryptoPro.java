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
 * A CryptoPro.
 */
@Document(collection = "crypto_pro")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CryptoPro implements Serializable {

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

    public CryptoPro id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getValue() {
        return this.value;
    }

    public CryptoPro value(String value) {
        this.setValue(value);
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getValueEn() {
        return this.valueEn;
    }

    public CryptoPro valueEn(String valueEn) {
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
            this.cryptoBrokers.forEach(i -> i.removeCryptoPros(this));
        }
        if (cryptoBrokers != null) {
            cryptoBrokers.forEach(i -> i.addCryptoPros(this));
        }
        this.cryptoBrokers = cryptoBrokers;
    }

    public CryptoPro cryptoBrokers(Set<CryptoBroker> cryptoBrokers) {
        this.setCryptoBrokers(cryptoBrokers);
        return this;
    }

    public CryptoPro addCryptoBrokers(CryptoBroker cryptoBroker) {
        this.cryptoBrokers.add(cryptoBroker);
        cryptoBroker.getCryptoPros().add(this);
        return this;
    }

    public CryptoPro removeCryptoBrokers(CryptoBroker cryptoBroker) {
        this.cryptoBrokers.remove(cryptoBroker);
        cryptoBroker.getCryptoPros().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CryptoPro)) {
            return false;
        }
        return getId() != null && getId().equals(((CryptoPro) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CryptoPro{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", valueEn='" + getValueEn() + "'" +
            "}";
    }
}
