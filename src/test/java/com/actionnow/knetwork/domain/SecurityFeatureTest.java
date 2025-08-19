package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.CryptoBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.SecurityFeatureTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class SecurityFeatureTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SecurityFeature.class);
        SecurityFeature securityFeature1 = getSecurityFeatureSample1();
        SecurityFeature securityFeature2 = new SecurityFeature();
        assertThat(securityFeature1).isNotEqualTo(securityFeature2);

        securityFeature2.setId(securityFeature1.getId());
        assertThat(securityFeature1).isEqualTo(securityFeature2);

        securityFeature2 = getSecurityFeatureSample2();
        assertThat(securityFeature1).isNotEqualTo(securityFeature2);
    }

    @Test
    void cryptoBrokersTest() {
        SecurityFeature securityFeature = getSecurityFeatureRandomSampleGenerator();
        CryptoBroker cryptoBrokerBack = getCryptoBrokerRandomSampleGenerator();

        securityFeature.addCryptoBrokers(cryptoBrokerBack);
        assertThat(securityFeature.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getSecurityFeatures()).containsOnly(securityFeature);

        securityFeature.removeCryptoBrokers(cryptoBrokerBack);
        assertThat(securityFeature.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getSecurityFeatures()).doesNotContain(securityFeature);

        securityFeature.cryptoBrokers(new HashSet<>(Set.of(cryptoBrokerBack)));
        assertThat(securityFeature.getCryptoBrokers()).containsOnly(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getSecurityFeatures()).containsOnly(securityFeature);

        securityFeature.setCryptoBrokers(new HashSet<>());
        assertThat(securityFeature.getCryptoBrokers()).doesNotContain(cryptoBrokerBack);
        assertThat(cryptoBrokerBack.getSecurityFeatures()).doesNotContain(securityFeature);
    }
}
