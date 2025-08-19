package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.FeatureTestSamples.*;
import static com.actionnow.knetwork.domain.ForexBrokerTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class FeatureTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Feature.class);
        Feature feature1 = getFeatureSample1();
        Feature feature2 = new Feature();
        assertThat(feature1).isNotEqualTo(feature2);

        feature2.setId(feature1.getId());
        assertThat(feature1).isEqualTo(feature2);

        feature2 = getFeatureSample2();
        assertThat(feature1).isNotEqualTo(feature2);
    }

    @Test
    void forexBrokersTest() {
        Feature feature = getFeatureRandomSampleGenerator();
        ForexBroker forexBrokerBack = getForexBrokerRandomSampleGenerator();

        feature.addForexBrokers(forexBrokerBack);
        assertThat(feature.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexFeatures()).containsOnly(feature);

        feature.removeForexBrokers(forexBrokerBack);
        assertThat(feature.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexFeatures()).doesNotContain(feature);

        feature.forexBrokers(new HashSet<>(Set.of(forexBrokerBack)));
        assertThat(feature.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexFeatures()).containsOnly(feature);

        feature.setForexBrokers(new HashSet<>());
        assertThat(feature.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexFeatures()).doesNotContain(feature);
    }
}
