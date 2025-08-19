package com.actionnow.knetwork.domain;

import static com.actionnow.knetwork.domain.ForexBrokerTestSamples.*;
import static com.actionnow.knetwork.domain.SupportTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.actionnow.knetwork.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class SupportTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Support.class);
        Support support1 = getSupportSample1();
        Support support2 = new Support();
        assertThat(support1).isNotEqualTo(support2);

        support2.setId(support1.getId());
        assertThat(support1).isEqualTo(support2);

        support2 = getSupportSample2();
        assertThat(support1).isNotEqualTo(support2);
    }

    @Test
    void forexBrokersTest() {
        Support support = getSupportRandomSampleGenerator();
        ForexBroker forexBrokerBack = getForexBrokerRandomSampleGenerator();

        support.addForexBrokers(forexBrokerBack);
        assertThat(support.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexSupports()).containsOnly(support);

        support.removeForexBrokers(forexBrokerBack);
        assertThat(support.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexSupports()).doesNotContain(support);

        support.forexBrokers(new HashSet<>(Set.of(forexBrokerBack)));
        assertThat(support.getForexBrokers()).containsOnly(forexBrokerBack);
        assertThat(forexBrokerBack.getForexSupports()).containsOnly(support);

        support.setForexBrokers(new HashSet<>());
        assertThat(support.getForexBrokers()).doesNotContain(forexBrokerBack);
        assertThat(forexBrokerBack.getForexSupports()).doesNotContain(support);
    }
}
