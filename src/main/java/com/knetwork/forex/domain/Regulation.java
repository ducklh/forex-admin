package com.knetwork.forex.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Regulation.
 */
@Document(collection = "regulation")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Regulation implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("authority")
    private String authority;

    @DBRef
    @Field("broker")
    @JsonIgnoreProperties(
        value = { "features", "regulations", "platforms", "instruments", "pros", "cons", "languages", "supports", "paymentMethods" },
        allowSetters = true
    )
    private Broker broker;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Regulation id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAuthority() {
        return this.authority;
    }

    public Regulation authority(String authority) {
        this.setAuthority(authority);
        return this;
    }

    public void setAuthority(String authority) {
        this.authority = authority;
    }

    public Broker getBroker() {
        return this.broker;
    }

    public void setBroker(Broker broker) {
        this.broker = broker;
    }

    public Regulation broker(Broker broker) {
        this.setBroker(broker);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Regulation)) {
            return false;
        }
        return getId() != null && getId().equals(((Regulation) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Regulation{" +
            "id=" + getId() +
            ", authority='" + getAuthority() + "'" +
            "}";
    }
}
