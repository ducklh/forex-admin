package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.CryptoBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.CryptoFeatureTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CryptoFeatureTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CryptoFeature.class);
        CryptoFeature cryptoFeature1 = getCryptoFeatureSample1();
        CryptoFeature cryptoFeature2 = new CryptoFeature();
        assertThat(cryptoFeature1).isNotEqualTo(cryptoFeature2);

        cryptoFeature2.setId(cryptoFeature1.getId());
        assertThat(cryptoFeature1).isEqualTo(cryptoFeature2);

        cryptoFeature2 = getCryptoFeatureSample2();
        assertThat(cryptoFeature1).isNotEqualTo(cryptoFeature2);
    }

    @Test
    void cryptoBrokersTest() {
        CryptoFeature cryptoFeature = getCryptoFeatureRandomSampleGenerator();
        CryptoBroker cryptoBrokerBack = getCryptoBrokerRandomSampleGenerator();

        cryptoFeature.addCryptoBrokers(cryptoBrokerBack);
        assertThat(cryptoFeature.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCryptoFeatures()).containsOnly(cryptoFeature);

        cryptoFeature.removeCryptoBrokers(cryptoBrokerBack);
        assertThat(cryptoFeature.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCryptoFeatures()).doesNotContain(cryptoFeature);

        cryptoFeature.cryptoBrokers(new HashSet<>(Set.of(cryptoBrokerBack)));
        assertThat(cryptoFeature.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCryptoFeatures()).containsOnly(cryptoFeature);

        cryptoFeature.setCryptoBrokers(new HashSet<>());
        assertThat(cryptoFeature.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getCryptoFeatures()).doesNotContain(cryptoFeature);
    }
}
