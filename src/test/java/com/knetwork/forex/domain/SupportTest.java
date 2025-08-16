package com.knetwork.forex.domain;

import static com.knetwork.forex.domain.BrokerTestSamples.*;
import static com.knetwork.forex.domain.SupportTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.knetwork.forex.web.rest.TestUtil;
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
    void brokerTest() {
        Support support = getSupportRandomSampleGenerator();
        Broker brokerBack = getBrokerRandomSampleGenerator();

        support.setBroker(brokerBack);
        assertThat(support.getBroker()).isEqualTo(brokerBack);

        support.broker(null);
        assertThat(support.getBroker()).isNull();
    }
}
