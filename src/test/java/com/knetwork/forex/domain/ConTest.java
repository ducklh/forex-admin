package com.knetwork.forex.domain;

import static com.knetwork.forex.domain.BrokerTestSamples.*;
import static com.knetwork.forex.domain.ConTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import com.knetwork.forex.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class ConTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Con.class);
        Con con1 = getConSample1();
        Con con2 = new Con();
        assertThat(con1).isNotEqualTo(con2);

        con2.setId(con1.getId());
        assertThat(con1).isEqualTo(con2);

        con2 = getConSample2();
        assertThat(con1).isNotEqualTo(con2);
    }

    @Test
    void brokerTest() {
        Con con = getConRandomSampleGenerator();
        Broker brokerBack = getBrokerRandomSampleGenerator();

        con.setBroker(brokerBack);
        assertThat(con.getBroker()).isEqualTo(brokerBack);

        con.broker(null);
        assertThat(con.getBroker()).isNull();
    }
}
