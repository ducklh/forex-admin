package com.knetwork.forex.domain;

import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.math.BigDecimal;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

/**
 * A CryptoBroker.
 */
@Document(collection = "crypto_broker")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CryptoBroker implements Serializable {

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

    @Size(max = 500)
    @Field("description")
    private String description;

    @Field("rating")
    private BigDecimal rating;

    @Field("features")
    private String features;

    @Field("regulation")
    private String regulation;

    @Field("min_deposit")
    private String minDeposit;

    @Field("trading_fees")
    private String tradingFees;

    @Field("supported_coins")
    private String supportedCoins;

    @Field("pros")
    private String pros;

    @Field("cons")
    private String cons;

    @Field("founded")
    private String founded;

    @Field("headquarters")
    private String headquarters;

    @Field("trading_volume")
    private String tradingVolume;

    @Field("security_features")
    private String securityFeatures;

    @Field("payment_methods")
    private String paymentMethods;

    @Field("customer_support")
    private String customerSupport;

    @Field("mobile_app")
    private Boolean mobileApp;

    @Field("api_support")
    private Boolean apiSupport;

    @Field("detailed_description")
    private String detailedDescription;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public String getId() {
        return this.id;
    }

    public CryptoBroker id(String id) {
        this.setId(id);
        return this;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public CryptoBroker name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLogo() {
        return this.logo;
    }

    public CryptoBroker logo(String logo) {
        this.setLogo(logo);
        return this;
    }

    public void setLogo(String logo) {
        this.logo = logo;
    }

    public String getUrl() {
        return this.url;
    }

    public CryptoBroker url(String url) {
        this.setUrl(url);
        return this;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDescription() {
        return this.description;
    }

    public CryptoBroker description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public BigDecimal getRating() {
        return this.rating;
    }

    public CryptoBroker rating(BigDecimal rating) {
        this.setRating(rating);
        return this;
    }

    public void setRating(BigDecimal rating) {
        this.rating = rating;
    }

    public String getFeatures() {
        return this.features;
    }

    public CryptoBroker features(String features) {
        this.setFeatures(features);
        return this;
    }

    public void setFeatures(String features) {
        this.features = features;
    }

    public String getRegulation() {
        return this.regulation;
    }

    public CryptoBroker regulation(String regulation) {
        this.setRegulation(regulation);
        return this;
    }

    public void setRegulation(String regulation) {
        this.regulation = regulation;
    }

    public String getMinDeposit() {
        return this.minDeposit;
    }

    public CryptoBroker minDeposit(String minDeposit) {
        this.setMinDeposit(minDeposit);
        return this;
    }

    public void setMinDeposit(String minDeposit) {
        this.minDeposit = minDeposit;
    }

    public String getTradingFees() {
        return this.tradingFees;
    }

    public CryptoBroker tradingFees(String tradingFees) {
        this.setTradingFees(tradingFees);
        return this;
    }

    public void setTradingFees(String tradingFees) {
        this.tradingFees = tradingFees;
    }

    public String getSupportedCoins() {
        return this.supportedCoins;
    }

    public CryptoBroker supportedCoins(String supportedCoins) {
        this.setSupportedCoins(supportedCoins);
        return this;
    }

    public void setSupportedCoins(String supportedCoins) {
        this.supportedCoins = supportedCoins;
    }

    public String getPros() {
        return this.pros;
    }

    public CryptoBroker pros(String pros) {
        this.setPros(pros);
        return this;
    }

    public void setPros(String pros) {
        this.pros = pros;
    }

    public String getCons() {
        return this.cons;
    }

    public CryptoBroker cons(String cons) {
        this.setCons(cons);
        return this;
    }

    public void setCons(String cons) {
        this.cons = cons;
    }

    public String getFounded() {
        return this.founded;
    }

    public CryptoBroker founded(String founded) {
        this.setFounded(founded);
        return this;
    }

    public void setFounded(String founded) {
        this.founded = founded;
    }

    public String getHeadquarters() {
        return this.headquarters;
    }

    public CryptoBroker headquarters(String headquarters) {
        this.setHeadquarters(headquarters);
        return this;
    }

    public void setHeadquarters(String headquarters) {
        this.headquarters = headquarters;
    }

    public String getTradingVolume() {
        return this.tradingVolume;
    }

    public CryptoBroker tradingVolume(String tradingVolume) {
        this.setTradingVolume(tradingVolume);
        return this;
    }

    public void setTradingVolume(String tradingVolume) {
        this.tradingVolume = tradingVolume;
    }

    public String getSecurityFeatures() {
        return this.securityFeatures;
    }

    public CryptoBroker securityFeatures(String securityFeatures) {
        this.setSecurityFeatures(securityFeatures);
        return this;
    }

    public void setSecurityFeatures(String securityFeatures) {
        this.securityFeatures = securityFeatures;
    }

    public String getPaymentMethods() {
        return this.paymentMethods;
    }

    public CryptoBroker paymentMethods(String paymentMethods) {
        this.setPaymentMethods(paymentMethods);
        return this;
    }

    public void setPaymentMethods(String paymentMethods) {
        this.paymentMethods = paymentMethods;
    }

    public String getCustomerSupport() {
        return this.customerSupport;
    }

    public CryptoBroker customerSupport(String customerSupport) {
        this.setCustomerSupport(customerSupport);
        return this;
    }

    public void setCustomerSupport(String customerSupport) {
        this.customerSupport = customerSupport;
    }

    public Boolean getMobileApp() {
        return this.mobileApp;
    }

    public CryptoBroker mobileApp(Boolean mobileApp) {
        this.setMobileApp(mobileApp);
        return this;
    }

    public void setMobileApp(Boolean mobileApp) {
        this.mobileApp = mobileApp;
    }

    public Boolean getApiSupport() {
        return this.apiSupport;
    }

    public CryptoBroker apiSupport(Boolean apiSupport) {
        this.setApiSupport(apiSupport);
        return this;
    }

    public void setApiSupport(Boolean apiSupport) {
        this.apiSupport = apiSupport;
    }

    public String getDetailedDescription() {
        return this.detailedDescription;
    }

    public CryptoBroker detailedDescription(String detailedDescription) {
        this.setDetailedDescription(detailedDescription);
        return this;
    }

    public void setDetailedDescription(String detailedDescription) {
        this.detailedDescription = detailedDescription;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CryptoBroker)) {
            return false;
        }
        return getId() != null && getId().equals(((CryptoBroker) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CryptoBroker{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", logo='" + getLogo() + "'" +
            ", url='" + getUrl() + "'" +
            ", description='" + getDescription() + "'" +
            ", rating=" + getRating() +
            ", features='" + getFeatures() + "'" +
            ", regulation='" + getRegulation() + "'" +
            ", minDeposit='" + getMinDeposit() + "'" +
            ", tradingFees='" + getTradingFees() + "'" +
            ", supportedCoins='" + getSupportedCoins() + "'" +
            ", pros='" + getPros() + "'" +
            ", cons='" + getCons() + "'" +
            ", founded='" + getFounded() + "'" +
            ", headquarters='" + getHeadquarters() + "'" +
            ", tradingVolume='" + getTradingVolume() + "'" +
            ", securityFeatures='" + getSecurityFeatures() + "'" +
            ", paymentMethods='" + getPaymentMethods() + "'" +
            ", customerSupport='" + getCustomerSupport() + "'" +
            ", mobileApp='" + getMobileApp() + "'" +
            ", apiSupport='" + getApiSupport() + "'" +
            ", detailedDescription='" + getDetailedDescription() + "'" +
            "}";
    }
}
