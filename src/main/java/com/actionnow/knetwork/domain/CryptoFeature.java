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
 * A CryptoFeature.
 */
@Document(collection = "crypto_feature")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CryptoFeature implements Serializable {

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

    public CryptoFeature id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getValue() {
        return this.value;
    }

    public CryptoFeature value(String value) {
        this.setValue(value);
        return this;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getValueEn() {
        return this.valueEn;
    }

    public CryptoFeature valueEn(String valueEn) {
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
            this.cryptoBrokers.forEach(i -> i.removeCryptoFeatures(this));
        }
        if (cryptoBrokers != null) {
            cryptoBrokers.forEach(i -> i.addCryptoFeatures(this));
        }
        this.cryptoBrokers = cryptoBrokers;
    }

    public CryptoFeature cryptoBrokers(Set<CryptoBroker> cryptoBrokers) {
        this.setCryptoBrokers(cryptoBrokers);
        return this;
    }

    public CryptoFeature addCryptoBrokers(CryptoBroker cryptoBroker) {
        this.cryptoBrokers.add(cryptoBroker);
        cryptoBroker.getCryptoFeatures().add(this);
        return this;
    }

    public CryptoFeature removeCryptoBrokers(CryptoBroker cryptoBroker) {
        this.cryptoBrokers.remove(cryptoBroker);
        cryptoBroker.getCryptoFeatures().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CryptoFeature)) {
            return false;
        }
        return getId() != null && getId().equals(((CryptoFeature) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CryptoFeature{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", valueEn='" + getValueEn() + "'" +
            "}";
    }
}
