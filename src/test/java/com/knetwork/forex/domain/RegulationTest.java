package com.knetwork.forex.domain;

import static com.knetwork.forex.domain.BrokerTestSamples.*;
import static com.knetwork.forex.domain.RegulationTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.knetwork.forex.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class RegulationTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Regulation.class);
        Regulation regulation1 = getRegulationSample1();
        Regulation regulation2 = new Regulation();
        assertThat(regulation1).isNotEqualTo(regulation2);

        regulation2.setId(regulation1.getId());
        assertThat(regulation1).isEqualTo(regulation2);

        regulation2 = getRegulationSample2();
        assertThat(regulation1).isNotEqualTo(regulation2);
    }

    @Test
    void brokerTest() {
        Regulation regulation = getRegulationRandomSampleGenerator();
        Broker brokerBack = getBrokerRandomSampleGenerator();

        regulation.setBroker(brokerBack);
        assertThat(regulation.getBroker()).isEqualTo(brokerBack);

        regulation.broker(null);
        assertThat(regulation.getBroker()).isNull();
    }
}
