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

    @Field("trading_fees")
    private String tradingFees;

    @Field("founded")
    private String founded;

    @Field("headquarters")
    private String headquarters;

    @Field("headquarters_en")
    private String headquartersEn;

    @Field("trading_volume")
    private String tradingVolume;

    @Field("mobile_app")
    private Boolean mobileApp;

    @Field("api_support")
    private Boolean apiSupport;

    @Field("detailed_description")
    private String detailedDescription;

    @Field("detailed_description_en")
    private String detailedDescriptionEn;

    @DBRef
    @Field("cryptoFeatures")
    @JsonIgnoreProperties(value = { "cryptoBrokers" }, allowSetters = true)
    private Set<CryptoFeature> cryptoFeatures = new HashSet<>();

    @DBRef
    @Field("supportedCoins")
    @JsonIgnoreProperties(value = { "cryptoBrokers" }, allowSetters = true)
    private Set<Coin> supportedCoins = new HashSet<>();

    @DBRef
    @Field("cryptoPros")
    @JsonIgnoreProperties(value = { "cryptoBrokers" }, allowSetters = true)
    private Set<CryptoPro> cryptoPros = new HashSet<>();

    @DBRef
    @Field("cryptoCons")
    @JsonIgnoreProperties(value = { "cryptoBrokers" }, allowSetters = true)
    private Set<CryptoCon> cryptoCons = new HashSet<>();

    @DBRef
    @Field("securityFeatures")
    @JsonIgnoreProperties(value = { "cryptoBrokers" }, allowSetters = true)
    private Set<SecurityFeature> securityFeatures = new HashSet<>();

    @DBRef
    @Field("paymentMethods")
    @JsonIgnoreProperties(value = { "cryptoBrokers" }, allowSetters = true)
    private Set<CryptoPaymentMethod> paymentMethods = new HashSet<>();

    @DBRef
    @Field("customerSupports")
    @JsonIgnoreProperties(value = { "cryptoBrokers" }, allowSetters = true)
    private Set<CustomerSupport> customerSupports = new HashSet<>();

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

    public String getNameEn() {
        return this.nameEn;
    }

    public CryptoBroker nameEn(String nameEn) {
        this.setNameEn(nameEn);
        return this;
    }

    public void setNameEn(String nameEn) {
        this.nameEn = nameEn;
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

    public String getDescriptionEn() {
        return this.descriptionEn;
    }

    public CryptoBroker descriptionEn(String descriptionEn) {
        this.setDescriptionEn(descriptionEn);
        return this;
    }

    public void setDescriptionEn(String descriptionEn) {
        this.descriptionEn = descriptionEn;
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

    public String getHeadquartersEn() {
        return this.headquartersEn;
    }

    public CryptoBroker headquartersEn(String headquartersEn) {
        this.setHeadquartersEn(headquartersEn);
        return this;
    }

    public void setHeadquartersEn(String headquartersEn) {
        this.headquartersEn = headquartersEn;
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

    public String getDetailedDescriptionEn() {
        return this.detailedDescriptionEn;
    }

    public CryptoBroker detailedDescriptionEn(String detailedDescriptionEn) {
        this.setDetailedDescriptionEn(detailedDescriptionEn);
        return this;
    }

    public void setDetailedDescriptionEn(String detailedDescriptionEn) {
        this.detailedDescriptionEn = detailedDescriptionEn;
    }

    public Set<CryptoFeature> getCryptoFeatures() {
        return this.cryptoFeatures;
    }

    public void setCryptoFeatures(Set<CryptoFeature> cryptoFeatures) {
        this.cryptoFeatures = cryptoFeatures;
    }

    public CryptoBroker cryptoFeatures(Set<CryptoFeature> cryptoFeatures) {
        this.setCryptoFeatures(cryptoFeatures);
        return this;
    }

    public CryptoBroker addCryptoFeatures(CryptoFeature cryptoFeature) {
        this.cryptoFeatures.add(cryptoFeature);
        return this;
    }

    public CryptoBroker removeCryptoFeatures(CryptoFeature cryptoFeature) {
        this.cryptoFeatures.remove(cryptoFeature);
        return this;
    }

    public Set<Coin> getSupportedCoins() {
        return this.supportedCoins;
    }

    public void setSupportedCoins(Set<Coin> coins) {
        this.supportedCoins = coins;
    }

    public CryptoBroker supportedCoins(Set<Coin> coins) {
        this.setSupportedCoins(coins);
        return this;
    }

    public CryptoBroker addSupportedCoins(Coin coin) {
        this.supportedCoins.add(coin);
        return this;
    }

    public CryptoBroker removeSupportedCoins(Coin coin) {
        this.supportedCoins.remove(coin);
        return this;
    }

    public Set<CryptoPro> getCryptoPros() {
        return this.cryptoPros;
    }

    public void setCryptoPros(Set<CryptoPro> cryptoPros) {
        this.cryptoPros = cryptoPros;
    }

    public CryptoBroker cryptoPros(Set<CryptoPro> cryptoPros) {
        this.setCryptoPros(cryptoPros);
        return this;
    }

    public CryptoBroker addCryptoPros(CryptoPro cryptoPro) {
        this.cryptoPros.add(cryptoPro);
        return this;
    }

    public CryptoBroker removeCryptoPros(CryptoPro cryptoPro) {
        this.cryptoPros.remove(cryptoPro);
        return this;
    }

    public Set<CryptoCon> getCryptoCons() {
        return this.cryptoCons;
    }

    public void setCryptoCons(Set<CryptoCon> cryptoCons) {
        this.cryptoCons = cryptoCons;
    }

    public CryptoBroker cryptoCons(Set<CryptoCon> cryptoCons) {
        this.setCryptoCons(cryptoCons);
        return this;
    }

    public CryptoBroker addCryptoCons(CryptoCon cryptoCon) {
        this.cryptoCons.add(cryptoCon);
        return this;
    }

    public CryptoBroker removeCryptoCons(CryptoCon cryptoCon) {
        this.cryptoCons.remove(cryptoCon);
        return this;
    }

    public Set<SecurityFeature> getSecurityFeatures() {
        return this.securityFeatures;
    }

    public void setSecurityFeatures(Set<SecurityFeature> securityFeatures) {
        this.securityFeatures = securityFeatures;
    }

    public CryptoBroker securityFeatures(Set<SecurityFeature> securityFeatures) {
        this.setSecurityFeatures(securityFeatures);
        return this;
    }

    public CryptoBroker addSecurityFeatures(SecurityFeature securityFeature) {
        this.securityFeatures.add(securityFeature);
        return this;
    }

    public CryptoBroker removeSecurityFeatures(SecurityFeature securityFeature) {
        this.securityFeatures.remove(securityFeature);
        return this;
    }

    public Set<CryptoPaymentMethod> getPaymentMethods() {
        return this.paymentMethods;
    }

    public void setPaymentMethods(Set<CryptoPaymentMethod> cryptoPaymentMethods) {
        this.paymentMethods = cryptoPaymentMethods;
    }

    public CryptoBroker paymentMethods(Set<CryptoPaymentMethod> cryptoPaymentMethods) {
        this.setPaymentMethods(cryptoPaymentMethods);
        return this;
    }

    public CryptoBroker addPaymentMethods(CryptoPaymentMethod cryptoPaymentMethod) {
        this.paymentMethods.add(cryptoPaymentMethod);
        return this;
    }

    public CryptoBroker removePaymentMethods(CryptoPaymentMethod cryptoPaymentMethod) {
        this.paymentMethods.remove(cryptoPaymentMethod);
        return this;
    }

    public Set<CustomerSupport> getCustomerSupports() {
        return this.customerSupports;
    }

    public void setCustomerSupports(Set<CustomerSupport> customerSupports) {
        this.customerSupports = customerSupports;
    }

    public CryptoBroker customerSupports(Set<CustomerSupport> customerSupports) {
        this.setCustomerSupports(customerSupports);
        return this;
    }

    public CryptoBroker addCustomerSupports(CustomerSupport customerSupport) {
        this.customerSupports.add(customerSupport);
        return this;
    }

    public CryptoBroker removeCustomerSupports(CustomerSupport customerSupport) {
        this.customerSupports.remove(customerSupport);
        return this;
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
            ", nameEn='" + getNameEn() + "'" +
            ", logo='" + getLogo() + "'" +
            ", url='" + getUrl() + "'" +
            ", description='" + getDescription() + "'" +
            ", descriptionEn='" + getDescriptionEn() + "'" +
            ", rating=" + getRating() +
            ", regulation='" + getRegulation() + "'" +
            ", minDeposit='" + getMinDeposit() + "'" +
            ", tradingFees='" + getTradingFees() + "'" +
            ", founded='" + getFounded() + "'" +
            ", headquarters='" + getHeadquarters() + "'" +
            ", headquartersEn='" + getHeadquartersEn() + "'" +
            ", tradingVolume='" + getTradingVolume() + "'" +
            ", mobileApp='" + getMobileApp() + "'" +
            ", apiSupport='" + getApiSupport() + "'" +
            ", detailedDescription='" + getDetailedDescription() + "'" +
            ", detailedDescriptionEn='" + getDetailedDescriptionEn() + "'" +
            "}";
    }
}
