package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.CoinTestSamples.*;
import static com.actionnow.knetwork.domain.CryptoBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.CryptoConTestSamples.*;
import static com.actionnow.knetwork.domain.CryptoFeatureTestSamples.*;
import static com.actionnow.knetwork.domain.CryptoPaymentMethodTestSamples.*;
import static com.actionnow.knetwork.domain.CryptoProTestSamples.*;
import static com.actionnow.knetwork.domain.CustomerSupportTestSamples.*;
import static com.actionnow.knetwork.domain.SecurityFeatureTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CryptoBrokerTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CryptoBroker.class);
        CryptoBroker cryptoBroker1 = getCryptoBrokerSample1();
        CryptoBroker cryptoBroker2 = new CryptoBroker();
        assertThat(cryptoBroker1).isNotEqualTo(cryptoBroker2);

        cryptoBroker2.setId(cryptoBroker1.getId());
        assertThat(cryptoBroker1).isEqualTo(cryptoBroker2);

        cryptoBroker2 = getCryptoBrokerSample2();
        assertThat(cryptoBroker1).isNotEqualTo(cryptoBroker2);
    }

    @Test
    void cryptoFeaturesTest() {
        CryptoBroker cryptoBroker = getCryptoBrokerRandomSampleGenerator();
        CryptoFeature cryptoFeatureBack = getCryptoFeatureRandomSampleGenerator();

        cryptoBroker.addCryptoFeatures(cryptoFeatureBack);
        assertThat(cryptoBroker.getCryptoFeatures()).containsOnly(cryptoFeatureBack);

        cryptoBroker.removeCryptoFeatures(cryptoFeatureBack);
        assertThat(cryptoBroker.getCryptoFeatures()).doesNotContain(cryptoFeatureBack);

        cryptoBroker.cryptoFeatures(new HashSet<>(Set.of(cryptoFeatureBack)));
        assertThat(cryptoBroker.getCryptoFeatures()).containsOnly(cryptoFeatureBack);

        cryptoBroker.setCryptoFeatures(new HashSet<>());
        assertThat(cryptoBroker.getCryptoFeatures()).doesNotContain(cryptoFeatureBack);
    }

    @Test
    void supportedCoinsTest() {
        CryptoBroker cryptoBroker = getCryptoBrokerRandomSampleGenerator();
        Coin coinBack = getCoinRandomSampleGenerator();

        cryptoBroker.addSupportedCoins(coinBack);
        assertThat(cryptoBroker.getSupportedCoins()).containsOnly(coinBack);

        cryptoBroker.removeSupportedCoins(coinBack);
        assertThat(cryptoBroker.getSupportedCoins()).doesNotContain(coinBack);

        cryptoBroker.supportedCoins(new HashSet<>(Set.of(coinBack)));
        assertThat(cryptoBroker.getSupportedCoins()).containsOnly(coinBack);

        cryptoBroker.setSupportedCoins(new HashSet<>());
        assertThat(cryptoBroker.getSupportedCoins()).doesNotContain(coinBack);
    }

    @Test
    void cryptoProsTest() {
        CryptoBroker cryptoBroker = getCryptoBrokerRandomSampleGenerator();
        CryptoPro cryptoProBack = getCryptoProRandomSampleGenerator();

        cryptoBroker.addCryptoPros(cryptoProBack);
        assertThat(cryptoBroker.getCryptoPros()).containsOnly(cryptoProBack);

        cryptoBroker.removeCryptoPros(cryptoProBack);
        assertThat(cryptoBroker.getCryptoPros()).doesNotContain(cryptoProBack);

        cryptoBroker.cryptoPros(new HashSet<>(Set.of(cryptoProBack)));
        assertThat(cryptoBroker.getCryptoPros()).containsOnly(cryptoProBack);

        cryptoBroker.setCryptoPros(new HashSet<>());
        assertThat(cryptoBroker.getCryptoPros()).doesNotContain(cryptoProBack);
    }

    @Test
    void cryptoConsTest() {
        CryptoBroker cryptoBroker = getCryptoBrokerRandomSampleGenerator();
        CryptoCon cryptoConBack = getCryptoConRandomSampleGenerator();

        cryptoBroker.addCryptoCons(cryptoConBack);
        assertThat(cryptoBroker.getCryptoCons()).containsOnly(cryptoConBack);

        cryptoBroker.removeCryptoCons(cryptoConBack);
        assertThat(cryptoBroker.getCryptoCons()).doesNotContain(cryptoConBack);

        cryptoBroker.cryptoCons(new HashSet<>(Set.of(cryptoConBack)));
        assertThat(cryptoBroker.getCryptoCons()).containsOnly(cryptoConBack);

        cryptoBroker.setCryptoCons(new HashSet<>());
        assertThat(cryptoBroker.getCryptoCons()).doesNotContain(cryptoConBack);
    }

    @Test
    void securityFeaturesTest() {
        CryptoBroker cryptoBroker = getCryptoBrokerRandomSampleGenerator();
        SecurityFeature securityFeatureBack = getSecurityFeatureRandomSampleGenerator();

        cryptoBroker.addSecurityFeatures(securityFeatureBack);
        assertThat(cryptoBroker.getSecurityFeatures()).containsOnly(securityFeatureBack);

        cryptoBroker.removeSecurityFeatures(securityFeatureBack);
        assertThat(cryptoBroker.getSecurityFeatures()).doesNotContain(securityFeatureBack);

        cryptoBroker.securityFeatures(new HashSet<>(Set.of(securityFeatureBack)));
        assertThat(cryptoBroker.getSecurityFeatures()).containsOnly(securityFeatureBack);

        cryptoBroker.setSecurityFeatures(new HashSet<>());
        assertThat(cryptoBroker.getSecurityFeatures()).doesNotContain(securityFeatureBack);
    }

    @Test
    void paymentMethodsTest() {
        CryptoBroker cryptoBroker = getCryptoBrokerRandomSampleGenerator();
        CryptoPaymentMethod cryptoPaymentMethodBack = getCryptoPaymentMethodRandomSampleGenerator();

        cryptoBroker.addPaymentMethods(cryptoPaymentMethodBack);
        assertThat(cryptoBroker.getPaymentMethods()).containsOnly(cryptoPaymentMethodBack);

        cryptoBroker.removePaymentMethods(cryptoPaymentMethodBack);
        assertThat(cryptoBroker.getPaymentMethods()).doesNotContain(cryptoPaymentMethodBack);

        cryptoBroker.paymentMethods(new HashSet<>(Set.of(cryptoPaymentMethodBack)));
        assertThat(cryptoBroker.getPaymentMethods()).containsOnly(cryptoPaymentMethodBack);

        cryptoBroker.setPaymentMethods(new HashSet<>());
        assertThat(cryptoBroker.getPaymentMethods()).doesNotContain(cryptoPaymentMethodBack);
    }

    @Test
    void customerSupportsTest() {
        CryptoBroker cryptoBroker = getCryptoBrokerRandomSampleGenerator();
        CustomerSupport customerSupportBack = getCustomerSupportRandomSampleGenerator();

        cryptoBroker.addCustomerSupports(customerSupportBack);
        assertThat(cryptoBroker.getCustomerSupports()).containsOnly(customerSupportBack);

        cryptoBroker.removeCustomerSupports(customerSupportBack);
        assertThat(cryptoBroker.getCustomerSupports()).doesNotContain(customerSupportBack);

        cryptoBroker.customerSupports(new HashSet<>(Set.of(customerSupportBack)));
        assertThat(cryptoBroker.getCustomerSupports()).containsOnly(customerSupportBack);

        cryptoBroker.setCustomerSupports(new HashSet<>());
        assertThat(cryptoBroker.getCustomerSupports()).doesNotContain(customerSupportBack);
    }
}
