package com.knetwork.forex.domain;

import static com.knetwork.forex.domain.BrokerTestSamples.*;
import static com.knetwork.forex.domain.FeatureTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.knetwork.forex.web.rest.TestUtil;
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
    void brokerTest() {
        Feature feature = getFeatureRandomSampleGenerator();
        Broker brokerBack = getBrokerRandomSampleGenerator();

        feature.setBroker(brokerBack);
        assertThat(feature.getBroker()).isEqualTo(brokerBack);

        feature.broker(null);
        assertThat(feature.getBroker()).isNull();
    }
}
