package com.actionnow.knetwork.domain;

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
 * A ForexBroker.
 */
@Document(collection = "forex_broker")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ForexBroker implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    private String id;

    @NotNull
    @Field("name")
    private String name;

    @Field("name_en")
    private String nameEn;

    @Field("logo")
    private String logo;

    @Field("url")
    private String url;

    @Field("description")
    private String description;

    @Field("description_en")
    private String descriptionEn;

    @Field("rating")
    private BigDecimal rating;

    @Field("regulation")
    private String regulation;

    @Field("min_deposit")
    private String minDeposit;

    @Field("spreads")
    private String spreads;

    @Field("leverage")
    private String leverage;

    @Field("founded")
    private String founded;

    @Field("headquarters")
    private String headquarters;

    @Field("headquarters_en")
    private String headquartersEn;

    @DBRef
    @Field("forexFeatures")
    @JsonIgnoreProperties(value = { "forexBrokers" }, allowSetters = true)
    private Set<Feature> forexFeatures = new HashSet<>();

    @DBRef
    @Field("forexPlatforms")
    @JsonIgnoreProperties(value = { "forexBrokers" }, allowSetters = true)
    private Set<Platform> forexPlatforms = new HashSet<>();

    @DBRef
    @Field("forexInstruments")
    @JsonIgnoreProperties(value = { "forexBrokers" }, allowSetters = true)
    private Set<Instrument> forexInstruments = new HashSet<>();

    @DBRef
    @Field("forexPros")
    @JsonIgnoreProperties(value = { "forexBrokers" }, allowSetters = true)
    private Set<Pro> forexPros = new HashSet<>();

    @DBRef
    @Field("forexCons")
    @JsonIgnoreProperties(value = { "forexBrokers" }, allowSetters = true)
    private Set<Con> forexCons = new HashSet<>();

    @DBRef
    @Field("forexLanguages")
    @JsonIgnoreProperties(value = { "forexBrokers" }, allowSetters = true)
    private Set<LanguageSupport> forexLanguages = new HashSet<>();

    @DBRef
    @Field("forexSupports")
    @JsonIgnoreProperties(value = { "forexBrokers" }, allowSetters = true)
    private Set<Support> forexSupports = new HashSet<>();

    @DBRef
    @Field("forexPaymentMethods")
    @JsonIgnoreProperties(value = { "forexBrokers" }, allowSetters = true)
    private Set<PaymentMethod> forexPaymentMethods = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public ForexBroker id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public ForexBroker name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNameEn() {
        return this.nameEn;
    }

    public ForexBroker nameEn(String nameEn) {
        this.setNameEn(nameEn);
        return this;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
    }

    public String getLogo() {
        return this.logo;
    }

    public ForexBroker logo(String logo) {
        this.setLogo(logo);
        return this;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getUrl() {
        return this.url;
    }

    public ForexBroker url(String url) {
        this.setUrl(url);
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return this.description;
    }

    public ForexBroker description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescriptionEn() {
        return this.descriptionEn;
    }

    public ForexBroker descriptionEn(String descriptionEn) {
        this.setDescriptionEn(descriptionEn);
        return this;
    }

    public void setDescriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
    }

    public BigDecimal getRating() {
        return this.rating;
    }

    public ForexBroker rating(BigDecimal rating) {
        this.setRating(rating);
        return this;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public String getRegulation() {
        return this.regulation;
    }

    public ForexBroker regulation(String regulation) {
        this.setRegulation(regulation);
        return this;
    }

    public void setRegulation(String regulation) {
        this.regulation = regulation;
    }

    public String getMinDeposit() {
        return this.minDeposit;
    }

    public ForexBroker minDeposit(String minDeposit) {
        this.setMinDeposit(minDeposit);
        return this;
    }

    public void setMinDeposit(String minDeposit) {
        this.minDeposit = minDeposit;
    }

    public String getSpreads() {
        return this.spreads;
    }

    public ForexBroker spreads(String spreads) {
        this.setSpreads(spreads);
        return this;
    }

    public void setSpreads(String spreads) {
        this.spreads = spreads;
    }

    public String getLeverage() {
        return this.leverage;
    }

    public ForexBroker leverage(String leverage) {
        this.setLeverage(leverage);
        return this;
    }

    public void setLeverage(String leverage) {
        this.leverage = leverage;
    }

    public String getFounded() {
        return this.founded;
    }

    public ForexBroker founded(String founded) {
        this.setFounded(founded);
        return this;
    }

    public void setFounded(String founded) {
        this.founded = founded;
    }

    public String getHeadquarters() {
        return this.headquarters;
    }

    public ForexBroker headquarters(String headquarters) {
        this.setHeadquarters(headquarters);
        return this;
    }

    public void setHeadquarters(String headquarters) {
        this.headquarters = headquarters;
    }

    public String getHeadquartersEn() {
        return this.headquartersEn;
    }

    public ForexBroker headquartersEn(String headquartersEn) {
        this.setHeadquartersEn(headquartersEn);
        return this;
    }

    public void setHeadquartersEn(String headquartersEn) {
        this.headquartersEn = headquartersEn;
    }

    public Set<Feature> getForexFeatures() {
        return this.forexFeatures;
    }

    public void setForexFeatures(Set<Feature> features) {
        this.forexFeatures = features;
    }

    public ForexBroker forexFeatures(Set<Feature> features) {
        this.setForexFeatures(features);
        return this;
    }

    public ForexBroker addForexFeatures(Feature feature) {
        this.forexFeatures.add(feature);
        return this;
    }

    public ForexBroker removeForexFeatures(Feature feature) {
        this.forexFeatures.remove(feature);
        return this;
    }

    public Set<Platform> getForexPlatforms() {
        return this.forexPlatforms;
    }

    public void setForexPlatforms(Set<Platform> platforms) {
        this.forexPlatforms = platforms;
    }

    public ForexBroker forexPlatforms(Set<Platform> platforms) {
        this.setForexPlatforms(platforms);
        return this;
    }

    public ForexBroker addForexPlatforms(Platform platform) {
        this.forexPlatforms.add(platform);
        return this;
    }

    public ForexBroker removeForexPlatforms(Platform platform) {
        this.forexPlatforms.remove(platform);
        return this;
    }

    public Set<Instrument> getForexInstruments() {
        return this.forexInstruments;
    }

    public void setForexInstruments(Set<Instrument> instruments) {
        this.forexInstruments = instruments;
    }

    public ForexBroker forexInstruments(Set<Instrument> instruments) {
        this.setForexInstruments(instruments);
        return this;
    }

    public ForexBroker addForexInstruments(Instrument instrument) {
        this.forexInstruments.add(instrument);
        return this;
    }

    public ForexBroker removeForexInstruments(Instrument instrument) {
        this.forexInstruments.remove(instrument);
        return this;
    }

    public Set<Pro> getForexPros() {
        return this.forexPros;
    }

    public void setForexPros(Set<Pro> pros) {
        this.forexPros = pros;
    }

    public ForexBroker forexPros(Set<Pro> pros) {
        this.setForexPros(pros);
        return this;
    }

    public ForexBroker addForexPros(Pro pro) {
        this.forexPros.add(pro);
        return this;
    }

    public ForexBroker removeForexPros(Pro pro) {
        this.forexPros.remove(pro);
        return this;
    }

    public Set<Con> getForexCons() {
        return this.forexCons;
    }

    public void setForexCons(Set<Con> cons) {
        this.forexCons = cons;
    }

    public ForexBroker forexCons(Set<Con> cons) {
        this.setForexCons(cons);
        return this;
    }

    public ForexBroker addForexCons(Con con) {
        this.forexCons.add(con);
        return this;
    }

    public ForexBroker removeForexCons(Con con) {
        this.forexCons.remove(con);
        return this;
    }

    public Set<LanguageSupport> getForexLanguages() {
        return this.forexLanguages;
    }

    public void setForexLanguages(Set<LanguageSupport> languageSupports) {
        this.forexLanguages = languageSupports;
    }

    public ForexBroker forexLanguages(Set<LanguageSupport> languageSupports) {
        this.setForexLanguages(languageSupports);
        return this;
    }

    public ForexBroker addForexLanguages(LanguageSupport languageSupport) {
        this.forexLanguages.add(languageSupport);
        return this;
    }

    public ForexBroker removeForexLanguages(LanguageSupport languageSupport) {
        this.forexLanguages.remove(languageSupport);
        return this;
    }

    public Set<Support> getForexSupports() {
        return this.forexSupports;
    }

    public void setForexSupports(Set<Support> supports) {
        this.forexSupports = supports;
    }

    public ForexBroker forexSupports(Set<Support> supports) {
        this.setForexSupports(supports);
        return this;
    }

    public ForexBroker addForexSupports(Support support) {
        this.forexSupports.add(support);
        return this;
    }

    public ForexBroker removeForexSupports(Support support) {
        this.forexSupports.remove(support);
        return this;
    }

    public Set<PaymentMethod> getForexPaymentMethods() {
        return this.forexPaymentMethods;
    }

    public void setForexPaymentMethods(Set<PaymentMethod> paymentMethods) {
        this.forexPaymentMethods = paymentMethods;
    }

    public ForexBroker forexPaymentMethods(Set<PaymentMethod> paymentMethods) {
        this.setForexPaymentMethods(paymentMethods);
        return this;
    }

    public ForexBroker addForexPaymentMethods(PaymentMethod paymentMethod) {
        this.forexPaymentMethods.add(paymentMethod);
        return this;
    }

    public ForexBroker removeForexPaymentMethods(PaymentMethod paymentMethod) {
        this.forexPaymentMethods.remove(paymentMethod);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ForexBroker)) {
            return false;
        }
        return getId() != null && getId().equals(((ForexBroker) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ForexBroker{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", nameEn='" + getNameEn() + "'" +
            ", logo='" + getLogo() + "'" +
            ", url='" + getUrl() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionEn='" + getDescriptionEn() + "'" +
            ", rating=" + getRating() +
            ", regulation='" + getRegulation() + "'" +
            ", minDeposit='" + getMinDeposit() + "'" +
            ", spreads='" + getSpreads() + "'" +
            ", leverage='" + getLeverage() + "'" +
            ", founded='" + getFounded() + "'" +
            ", headquarters='" + getHeadquarters() + "'" +
            ", headquartersEn='" + getHeadquartersEn() + "'" +
            "}";
    }
}
