package com.knetwork.forex.domain;

import static com.knetwork.forex.domain.BrokerTestSamples.*;
import static com.knetwork.forex.domain.PlatformTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.knetwork.forex.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class PlatformTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Platform.class);
        Platform platform1 = getPlatformSample1();
        Platform platform2 = new Platform();
        assertThat(platform1).isNotEqualTo(platform2);

        platform2.setId(platform1.getId());
        assertThat(platform1).isEqualTo(platform2);

        platform2 = getPlatformSample2();
        assertThat(platform1).isNotEqualTo(platform2);
    }

    @Test
    void brokerTest() {
        Platform platform = getPlatformRandomSampleGenerator();
        Broker brokerBack = getBrokerRandomSampleGenerator();

        platform.setBroker(brokerBack);
        assertThat(platform.getBroker()).isEqualTo(brokerBack);

        platform.broker(null);
        assertThat(platform.getBroker()).isNull();
    }
}
