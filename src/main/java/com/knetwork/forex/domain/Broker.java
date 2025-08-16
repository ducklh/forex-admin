package com.knetwork.forex.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A Broker.
 */
@Document(collection = "broker")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Broker implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @Field("logo")
    private String logo;

    @Field("url")
    private String url;

    @Field("description")
    private String description;

    @Field("rating")
    private Double rating;

    @Field("min_deposit")
    private BigDecimal minDeposit;

    @Field("spreads")
    private String spreads;

    @Field("leverage")
    private String leverage;

    @Field("founded")
    private Integer founded;

    @Field("headquarters")
    private String headquarters;

    @DBRef
    @Field("features")
    @JsonIgnoreProperties(value = { "broker" }, allowSetters = true)
    private Set<Feature> features = new HashSet<>();

    @DBRef
    @Field("regulations")
    @JsonIgnoreProperties(value = { "broker" }, allowSetters = true)
    private Set<Regulation> regulations = new HashSet<>();

    @DBRef
    @Field("platforms")
    @JsonIgnoreProperties(value = { "broker" }, allowSetters = true)
    private Set<Platform> platforms = new HashSet<>();

    @DBRef
    @Field("instruments")
    @JsonIgnoreProperties(value = { "broker" }, allowSetters = true)
    private Set<Instrument> instruments = new HashSet<>();

    @DBRef
    @Field("pros")
    @JsonIgnoreProperties(value = { "broker" }, allowSetters = true)
    private Set<Pro> pros = new HashSet<>();

    @DBRef
    @Field("cons")
    @JsonIgnoreProperties(value = { "broker" }, allowSetters = true)
    private Set<Con> cons = new HashSet<>();

    @DBRef
    @Field("languages")
    @JsonIgnoreProperties(value = { "broker" }, allowSetters = true)
    private Set<Language> languages = new HashSet<>();

    @DBRef
    @Field("supports")
    @JsonIgnoreProperties(value = { "broker" }, allowSetters = true)
    private Set<Support> supports = new HashSet<>();

    @DBRef
    @Field("paymentMethods")
    @JsonIgnoreProperties(value = { "broker" }, allowSetters = true)
    private Set<PaymentMethod> paymentMethods = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public Broker id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public Broker name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogo() {
        return this.logo;
    }

    public Broker logo(String logo) {
        this.setLogo(logo);
        return this;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getUrl() {
        return this.url;
    }

    public Broker url(String url) {
        this.setUrl(url);
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return this.description;
    }

    public Broker description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getRating() {
        return this.rating;
    }

    public Broker rating(Double rating) {
        this.setRating(rating);
        return this;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public BigDecimal getMinDeposit() {
        return this.minDeposit;
    }

    public Broker minDeposit(BigDecimal minDeposit) {
        this.setMinDeposit(minDeposit);
        return this;
    }

    public void setMinDeposit(BigDecimal minDeposit) {
        this.minDeposit = minDeposit;
    }

    public String getSpreads() {
        return this.spreads;
    }

    public Broker spreads(String spreads) {
        this.setSpreads(spreads);
        return this;
    }

    public void setSpreads(String spreads) {
        this.spreads = spreads;
    }

    public String getLeverage() {
        return this.leverage;
    }

    public Broker leverage(String leverage) {
        this.setLeverage(leverage);
        return this;
    }

    public void setLeverage(String leverage) {
        this.leverage = leverage;
    }

    public Integer getFounded() {
        return this.founded;
    }

    public Broker founded(Integer founded) {
        this.setFounded(founded);
        return this;
    }

    public void setFounded(Integer founded) {
        this.founded = founded;
    }

    public String getHeadquarters() {
        return this.headquarters;
    }

    public Broker headquarters(String headquarters) {
        this.setHeadquarters(headquarters);
        return this;
    }

    public void setHeadquarters(String headquarters) {
        this.headquarters = headquarters;
    }

    public Set<Feature> getFeatures() {
        return this.features;
    }

    public void setFeatures(Set<Feature> features) {
        if (this.features != null) {
            this.features.forEach(i -> i.setBroker(null));
        }
        if (features != null) {
            features.forEach(i -> i.setBroker(this));
        }
        this.features = features;
    }

    public Broker features(Set<Feature> features) {
        this.setFeatures(features);
        return this;
    }

    public Broker addFeatures(Feature feature) {
        this.features.add(feature);
        feature.setBroker(this);
        return this;
    }

    public Broker removeFeatures(Feature feature) {
        this.features.remove(feature);
        feature.setBroker(null);
        return this;
    }

    public Set<Regulation> getRegulations() {
        return this.regulations;
    }

    public void setRegulations(Set<Regulation> regulations) {
        if (this.regulations != null) {
            this.regulations.forEach(i -> i.setBroker(null));
        }
        if (regulations != null) {
            regulations.forEach(i -> i.setBroker(this));
        }
        this.regulations = regulations;
    }

    public Broker regulations(Set<Regulation> regulations) {
        this.setRegulations(regulations);
        return this;
    }

    public Broker addRegulations(Regulation regulation) {
        this.regulations.add(regulation);
        regulation.setBroker(this);
        return this;
    }

    public Broker removeRegulations(Regulation regulation) {
        this.regulations.remove(regulation);
        regulation.setBroker(null);
        return this;
    }

    public Set<Platform> getPlatforms() {
        return this.platforms;
    }

    public void setPlatforms(Set<Platform> platforms) {
        if (this.platforms != null) {
            this.platforms.forEach(i -> i.setBroker(null));
        }
        if (platforms != null) {
            platforms.forEach(i -> i.setBroker(this));
        }
        this.platforms = platforms;
    }

    public Broker platforms(Set<Platform> platforms) {
        this.setPlatforms(platforms);
        return this;
    }

    public Broker addPlatforms(Platform platform) {
        this.platforms.add(platform);
        platform.setBroker(this);
        return this;
    }

    public Broker removePlatforms(Platform platform) {
        this.platforms.remove(platform);
        platform.setBroker(null);
        return this;
    }

    public Set<Instrument> getInstruments() {
        return this.instruments;
    }

    public void setInstruments(Set<Instrument> instruments) {
        if (this.instruments != null) {
            this.instruments.forEach(i -> i.setBroker(null));
        }
        if (instruments != null) {
            instruments.forEach(i -> i.setBroker(this));
        }
        this.instruments = instruments;
    }

    public Broker instruments(Set<Instrument> instruments) {
        this.setInstruments(instruments);
        return this;
    }

    public Broker addInstruments(Instrument instrument) {
        this.instruments.add(instrument);
        instrument.setBroker(this);
        return this;
    }

    public Broker removeInstruments(Instrument instrument) {
        this.instruments.remove(instrument);
        instrument.setBroker(null);
        return this;
    }

    public Set<Pro> getPros() {
        return this.pros;
    }

    public void setPros(Set<Pro> pros) {
        if (this.pros != null) {
            this.pros.forEach(i -> i.setBroker(null));
        }
        if (pros != null) {
            pros.forEach(i -> i.setBroker(this));
        }
        this.pros = pros;
    }

    public Broker pros(Set<Pro> pros) {
        this.setPros(pros);
        return this;
    }

    public Broker addPros(Pro pro) {
        this.pros.add(pro);
        pro.setBroker(this);
        return this;
    }

    public Broker removePros(Pro pro) {
        this.pros.remove(pro);
        pro.setBroker(null);
        return this;
    }

    public Set<Con> getCons() {
        return this.cons;
    }

    public void setCons(Set<Con> cons) {
        if (this.cons != null) {
            this.cons.forEach(i -> i.setBroker(null));
        }
        if (cons != null) {
            cons.forEach(i -> i.setBroker(this));
        }
        this.cons = cons;
    }

    public Broker cons(Set<Con> cons) {
        this.setCons(cons);
        return this;
    }

    public Broker addCons(Con con) {
        this.cons.add(con);
        con.setBroker(this);
        return this;
    }

    public Broker removeCons(Con con) {
        this.cons.remove(con);
        con.setBroker(null);
        return this;
    }

    public Set<Language> getLanguages() {
        return this.languages;
    }

    public void setLanguages(Set<Language> languages) {
        if (this.languages != null) {
            this.languages.forEach(i -> i.setBroker(null));
        }
        if (languages != null) {
            languages.forEach(i -> i.setBroker(this));
        }
        this.languages = languages;
    }

    public Broker languages(Set<Language> languages) {
        this.setLanguages(languages);
        return this;
    }

    public Broker addLanguages(Language language) {
        this.languages.add(language);
        language.setBroker(this);
        return this;
    }

    public Broker removeLanguages(Language language) {
        this.languages.remove(language);
        language.setBroker(null);
        return this;
    }

    public Set<Support> getSupports() {
        return this.supports;
    }

    public void setSupports(Set<Support> supports) {
        if (this.supports != null) {
            this.supports.forEach(i -> i.setBroker(null));
        }
        if (supports != null) {
            supports.forEach(i -> i.setBroker(this));
        }
        this.supports = supports;
    }

    public Broker supports(Set<Support> supports) {
        this.setSupports(supports);
        return this;
    }

    public Broker addSupports(Support support) {
        this.supports.add(support);
        support.setBroker(this);
        return this;
    }

    public Broker removeSupports(Support support) {
        this.supports.remove(support);
        support.setBroker(null);
        return this;
    }

    public Set<PaymentMethod> getPaymentMethods() {
        return this.paymentMethods;
    }

    public void setPaymentMethods(Set<PaymentMethod> paymentMethods) {
        if (this.paymentMethods != null) {
            this.paymentMethods.forEach(i -> i.setBroker(null));
        }
        if (paymentMethods != null) {
            paymentMethods.forEach(i -> i.setBroker(this));
        }
        this.paymentMethods = paymentMethods;
    }

    public Broker paymentMethods(Set<PaymentMethod> paymentMethods) {
        this.setPaymentMethods(paymentMethods);
        return this;
    }

    public Broker addPaymentMethods(PaymentMethod paymentMethod) {
        this.paymentMethods.add(paymentMethod);
        paymentMethod.setBroker(this);
        return this;
    }

    public Broker removePaymentMethods(PaymentMethod paymentMethod) {
        this.paymentMethods.remove(paymentMethod);
        paymentMethod.setBroker(null);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Broker)) {
            return false;
        }
        return getId() != null && getId().equals(((Broker) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Broker{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", logo='" + getLogo() + "'" +
            ", url='" + getUrl() + "'" +
            ", description='" + getDescription() + "'" +
            ", rating=" + getRating() +
            ", minDeposit=" + getMinDeposit() +
            ", spreads='" + getSpreads() + "'" +
            ", leverage='" + getLeverage() + "'" +
            ", founded=" + getFounded() +
            ", headquarters='" + getHeadquarters() + "'" +
            "}";
    }
}
