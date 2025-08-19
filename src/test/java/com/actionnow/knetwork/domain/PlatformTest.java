package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.ForexBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.PlatformTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
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
    void forexBrokersTest() {
        Platform platform = getPlatformRandomSampleGenerator();
        ForexBroker forexBrokerBack = getForexBrokerRandomSampleGenerator();

        platform.addForexBrokers(forexBrokerBack);
        assertThat(platform.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexPlatforms()).containsOnly(platform);

        platform.removeForexBrokers(forexBrokerBack);
        assertThat(platform.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexPlatforms()).doesNotContain(platform);

        platform.forexBrokers(new HashSet<>(Set.of(forexBrokerBack)));
        assertThat(platform.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexPlatforms()).containsOnly(platform);

        platform.setForexBrokers(new HashSet<>());
        assertThat(platform.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexPlatforms()).doesNotContain(platform);
    }
}
