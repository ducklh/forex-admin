package com.knetwork.forex.domain;

import static com.knetwork.forex.domain.BrokerTestSamples.*;
import static com.knetwork.forex.domain.ProTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.knetwork.forex.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ProTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Pro.class);
        Pro pro1 = getProSample1();
        Pro pro2 = new Pro();
        assertThat(pro1).isNotEqualTo(pro2);

        pro2.setId(pro1.getId());
        assertThat(pro1).isEqualTo(pro2);

        pro2 = getProSample2();
        assertThat(pro1).isNotEqualTo(pro2);
    }

    @Test
    void brokerTest() {
        Pro pro = getProRandomSampleGenerator();
        Broker brokerBack = getBrokerRandomSampleGenerator();

        pro.setBroker(brokerBack);
        assertThat(pro.getBroker()).isEqualTo(brokerBack);

        pro.broker(null);
        assertThat(pro.getBroker()).isNull();
    }
}
